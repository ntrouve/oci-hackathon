#!/usr/bin/env python3
import html
import json
import os
import re
import time
import urllib.error
import urllib.parse
import urllib.request
import xml.etree.ElementTree as ET
from http.server import BaseHTTPRequestHandler, HTTPServer
from socketserver import ThreadingMixIn, UnixStreamServer


PORT = 8008
MAX_GROUPS = 8
MAX_RESULTS = 4
USER_AGENT = (
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) "
    "AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0 Safari/537.36"
)


class ThreadingHTTPServer(ThreadingMixIn, HTTPServer):
    daemon_threads = True


class UnixHTTPServer(ThreadingMixIn, UnixStreamServer):
    daemon_threads = True


def fetch_text(url, timeout=8, max_bytes=900000):
    request = urllib.request.Request(url, headers={"User-Agent": USER_AGENT})
    with urllib.request.urlopen(request, timeout=timeout) as response:
        data = response.read(max_bytes)
        charset = response.headers.get_content_charset() or "utf-8"
        return data.decode(charset, errors="replace")


def clean_text(value):
    value = re.sub(r"<[^>]+>", " ", value or "")
    value = html.unescape(value)
    return re.sub(r"\s+", " ", value).strip()


def runs_text(value):
    if not value:
        return ""
    if "simpleText" in value:
        return value.get("simpleText", "")
    return "".join(run.get("text", "") for run in value.get("runs", []))


def extract_json_object(text, marker):
    marker_index = text.find(marker)
    if marker_index < 0:
        return ""
    start = text.find("{", marker_index)
    if start < 0:
        return ""
    depth = 0
    in_string = False
    escaped = False
    for index in range(start, len(text)):
        char = text[index]
        if in_string:
            if escaped:
                escaped = False
            elif char == "\\":
                escaped = True
            elif char == '"':
                in_string = False
        else:
            if char == '"':
                in_string = True
            elif char == "{":
                depth += 1
            elif char == "}":
                depth -= 1
                if depth == 0:
                    return text[start:index + 1]
    return ""


def walk_video_renderers(value):
    if isinstance(value, dict):
        if "videoRenderer" in value:
            yield value["videoRenderer"]
        for child in value.values():
            for renderer in walk_video_renderers(child):
                yield renderer
    elif isinstance(value, list):
        for item in value:
            for renderer in walk_video_renderers(item):
                yield renderer


def walk_channel_renderers(value):
    if isinstance(value, dict):
        if "channelRenderer" in value:
            yield value["channelRenderer"]
        for child in value.values():
            for renderer in walk_channel_renderers(child):
                yield renderer
    elif isinstance(value, list):
        for item in value:
            for renderer in walk_channel_renderers(item):
                yield renderer


def youtube_search(query, limit=MAX_RESULTS):
    url = "https://www.youtube.com/results?search_query={}".format(urllib.parse.quote_plus(query))
    page = fetch_text(url, timeout=10, max_bytes=5000000)
    json_text = extract_json_object(page, "var ytInitialData")
    if not json_text:
        json_text = extract_json_object(page, "ytInitialData")
    if not json_text:
        return []
    data = json.loads(json_text)
    results = []
    seen = set()
    for renderer in walk_video_renderers(data):
        video_id = renderer.get("videoId", "")
        if not video_id or video_id in seen:
            continue
        seen.add(video_id)
        title = clean_text(runs_text(renderer.get("title", {})))
        snippet = clean_text(runs_text(renderer.get("descriptionSnippet", {})))
        owner = clean_text(runs_text(renderer.get("ownerText", {})))
        meta = " ".join(part for part in [owner, snippet] if part)
        result = {
            "title": title,
            "url": "https://www.youtube.com/watch?v={}".format(video_id),
            "snippet": meta or "YouTube video result for {}".format(query),
            "source": "YouTube"
        }
        if title:
            results.append(result)
        if len(results) >= limit:
            break
    if len(results) < limit:
        for renderer in walk_channel_renderers(data):
            channel_id = renderer.get("channelId", "")
            if not channel_id or channel_id in seen:
                continue
            seen.add(channel_id)
            title = clean_text(runs_text(renderer.get("title", {})))
            snippet = clean_text(runs_text(renderer.get("descriptionSnippet", {})))
            canonical = (
                renderer.get("navigationEndpoint", {})
                .get("browseEndpoint", {})
                .get("canonicalBaseUrl", "")
            )
            channel_url = "https://www.youtube.com{}".format(canonical) if canonical else "https://www.youtube.com/channel/{}".format(channel_id)
            if title:
                results.append({
                    "title": "{} YouTube channel".format(title),
                    "url": channel_url,
                    "snippet": snippet or "YouTube channel result for {}".format(query),
                    "source": "YouTube"
                })
            if len(results) >= limit:
                break
    return results


def google_news_search(query, limit=MAX_RESULTS):
    rss_url = (
        "https://news.google.com/rss/search?q={}&hl=en-US&gl=US&ceid=US:en"
        .format(urllib.parse.quote_plus(query))
    )
    xml_text = fetch_text(rss_url)
    root = ET.fromstring(xml_text)
    results = []
    for item in root.findall("./channel/item"):
        title = clean_text(item.findtext("title") or "")
        link = clean_text(item.findtext("link") or "")
        description = clean_text(item.findtext("description") or "")
        source = item.findtext("source") or "Google News"
        if title and link:
            results.append({
                "title": title,
                "url": link,
                "snippet": description,
                "source": clean_text(source)
            })
        if len(results) >= limit:
            break
    return results


def execute_source(source):
    kind = source.get("kind", "Web")
    query = source.get("query", "")
    if not query:
        return []
    if kind == "News":
        return google_news_search(query)
    if kind == "YouTube":
        return youtube_search(query)
    if kind == "Videos":
        return youtube_search(query)
    return google_news_search(query)


def filter_results(results, source):
    required = clean_text(source.get("mustInclude", "")).lower().strip('"')
    if not required:
        return results
    filtered = []
    for result in results:
        haystack = "{} {}".format(result.get("title", ""), result.get("snippet", "")).lower()
        if required in haystack:
            filtered.append(result)
    return filtered


def build_summary(payload, groups):
    account = payload.get("account", {})
    company = account.get("groupName") or account.get("name") or "this account"
    result_count = sum(len(group.get("results", [])) for group in groups)
    snippets = []
    for group in groups:
        for result in group.get("results", []):
            if result.get("snippet"):
                snippets.append(result["snippet"])
            if len(snippets) >= 4:
                break
        if len(snippets) >= 4:
            break
    if not snippets:
        snippets.append("No reliable snippets were returned. Use the fallback search links and try narrower company or executive queries.")
    return {
        "headline": "Executed {} searches for {} and returned {} public results.".format(len(groups), company, result_count),
        "businessContext": account.get("accountFit", ""),
        "challengeThemes": payload.get("challenges", [])[:5],
        "evidenceHighlights": snippets[:4]
    }


class ResearchHandler(BaseHTTPRequestHandler):
    def _send_json(self, status, data):
        body = json.dumps(data, ensure_ascii=False).encode("utf-8")
        self.send_response(status)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Cache-Control", "no-store")
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        self.wfile.write(body)

    def do_GET(self):
        if self.path == "/health":
            self._send_json(200, {"ok": True, "service": "territory-research-api"})
            return
        self._send_json(404, {"error": "not_found"})

    def do_POST(self):
        if urllib.parse.urlparse(self.path).path != "/research":
            self._send_json(404, {"error": "not_found"})
            return
        try:
            length = int(self.headers.get("Content-Length", "0"))
            payload = json.loads(self.rfile.read(length).decode("utf-8"))
            sources = payload.get("sources", [])[:MAX_GROUPS]
            groups = []
            for source in sources:
                group = {
                    "title": source.get("title", "Search"),
                    "kind": source.get("kind", "Web"),
                    "query": source.get("query", ""),
                    "fallbackUrl": source.get("url", ""),
                    "results": [],
                    "error": ""
                }
                try:
                    group["results"] = filter_results(execute_source(source), source)
                    if not group["results"] and source.get("fallbackQuery"):
                        fallback_source = dict(source)
                        fallback_source["query"] = source["fallbackQuery"]
                        group["results"] = filter_results(execute_source(fallback_source), fallback_source)
                        if group["results"]:
                            group["query"] = source["fallbackQuery"]
                            group["fallbackUsed"] = True
                except (urllib.error.URLError, TimeoutError, ET.ParseError, ValueError) as error:
                    group["error"] = str(error)
                groups.append(group)
            response = {
                "generatedAt": int(time.time()),
                "summary": build_summary(payload, groups),
                "groups": groups
            }
            self._send_json(200, response)
        except Exception as error:
            self._send_json(500, {"error": "research_failed", "detail": str(error)})

    def log_message(self, fmt, *args):
        print("{} - {}".format(self.address_string(), fmt % args))

    def address_string(self):
        if isinstance(self.client_address, tuple):
            return self.client_address[0]
        return "local"


if __name__ == "__main__":
    socket_path = os.environ.get("RESEARCH_SOCKET")
    if socket_path:
        if os.path.exists(socket_path):
            os.unlink(socket_path)
        server = UnixHTTPServer(socket_path, ResearchHandler)
        os.chmod(socket_path, 0o660)
        print("Territory research API listening on {}".format(socket_path))
    else:
        server = ThreadingHTTPServer(("127.0.0.1", PORT), ResearchHandler)
        print("Territory research API listening on 127.0.0.1:{}".format(PORT))
    server.serve_forever()
