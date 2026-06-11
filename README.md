# Territory Signal Copilot

Territory Signal Copilot is a hackathon MVP for OCI sales reps entering a new territory. It turns an uploaded territory account file into a signal-ranked prospecting workspace with OCI narratives, persona recommendations, and copyable email drafts.

## Live Demo

https://129-146-81-29.sslip.io/

## Demo Workflow

1. Upload a CSV exported from the territory workbook or load the sample territory.
2. Review account records ranked by buying-signal strength.
3. Open an account to inspect territory and enrichment signals.
4. Select a buying-committee persona.
5. Run live research to execute web, news, YouTube, and video searches from the OCI-hosted backend.
6. Review the OCI narrative and copy the email draft.

## Research Console

For each selected account, the app generates:

- Executive and buying-committee persona targets to validate in public sources.
- Executed web, news, YouTube, and video result groups for the account, executives, business model, and likely challenges.
- A copyable research brief that includes the executed evidence highlights and result links.

The frontend calls `/api/research`, which is proxied by Nginx to a small Python backend on the OCI VM. The backend uses public Google News RSS and YouTube result pages without requiring demo API keys. Production-grade result quality can be added behind the same interface with a commercial search API and video API key.

## CSV Format

The app is optimized for the CSV version of `Hackathon Territory Data_filtered.xlsx`:

```csv
PARTY UNIQUE NAME,Rep,DESCRIPTION,STREET ADDRESS,COUNTRY,GU NAME
"Seegrid Corporation (PITTSBURGH, US)",jason.oliveira@oracle.com,"PA: Pittsburgh, Harrisburg, Erie, Malvern","216 Ridc Park West Dr,PITTSBURGH,PA 15275",United States,Seegrid Corporation
```

Required:

- `PARTY UNIQUE NAME`
- `Rep`
- `DESCRIPTION`
- `STREET ADDRESS`
- `COUNTRY`
- `GU NAME`

The upload control accepts `.csv`, so export the workbook sheet to CSV before uploading. `PARTY UNIQUE NAME` is used as the unique row/account name, while `GU NAME` is retained as the group/parent account context for narratives and email drafts.

The parser remains backward-compatible with simple files that include `account`, `account name`, `company`, `company name`, or `name`, but the demo data and expected format now follow the territory workbook.

## Local Preview

```bash
python3 -m http.server 4173 --directory app
```

Then open:

```text
http://127.0.0.1:4173/
```

## Files

- `app/index.html`: static UI shell
- `app/styles.css`: Oracle Redwood-inspired styling
- `app/main.js`: sample data, CSV parsing, account selection, persona logic, executed research, and copy actions
- `api/research_server.py`: OCI-hosted research API for executed web/news/video result retrieval
- `deploy/`: Nginx and systemd files for the OCI-hosted research API
- `sample-accounts.csv`: example upload file
