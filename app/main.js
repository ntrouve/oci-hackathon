const personas = [
  {
    id: "cio",
    label: "CIO",
    focus: "Cloud strategy, modernization, resilient growth",
    hook: "connect business priorities to a phased cloud modernization path"
  },
  {
    id: "vp-infra",
    label: "VP Infrastructure",
    focus: "Performance, migration risk, operating model",
    hook: "reduce infrastructure complexity while improving workload performance"
  },
  {
    id: "ciso",
    label: "CISO",
    focus: "Security posture, compliance, data protection",
    hook: "strengthen security and governance without slowing delivery"
  },
  {
    id: "data-ai",
    label: "Data & AI Leader",
    focus: "AI platforms, data gravity, model operations",
    hook: "move AI pilots toward governed production workloads"
  }
];

const sampleRows = [
  {
    "PARTY UNIQUE NAME": "Seegrid Corporation (PITTSBURGH, US)",
    "Rep": "jason.oliveira@oracle.com",
    "DESCRIPTION": "PA: Pittsburgh, Harrisburg, Erie, Malvern",
    "STREET ADDRESS": "216 Ridc Park West Dr,PITTSBURGH,PA 15275",
    "COUNTRY": "United States",
    "GU NAME": "Seegrid Corporation"
  },
  {
    "PARTY UNIQUE NAME": "CLARION HOSPITAL (CLARION, US)",
    "Rep": "jason.oliveira@oracle.com",
    "DESCRIPTION": "PA: Pittsburgh, Harrisburg, Erie, Malvern",
    "STREET ADDRESS": "1 HOSPITAL DR,CLARION,PA 16214",
    "COUNTRY": "United States",
    "GU NAME": "Independence Health System"
  },
  {
    "PARTY UNIQUE NAME": "Capital Blue Cross (Harrisburg, US)",
    "Rep": "jason.oliveira@oracle.com",
    "DESCRIPTION": "PA: Pittsburgh, Harrisburg, Erie, Malvern",
    "STREET ADDRESS": "2500 Elmerton Ave,Harrisburg,PA 17177",
    "COUNTRY": "United States",
    "GU NAME": "Capital Blue Cross"
  },
  {
    "PARTY UNIQUE NAME": "Butler Health System - Butler Memorial Hospital (Butler, US)",
    "Rep": "jason.oliveira@oracle.com",
    "DESCRIPTION": "PA: Pittsburgh, Harrisburg, Erie, Malvern",
    "STREET ADDRESS": "911 East Brady Street,Butler,PA 16001",
    "COUNTRY": "United States",
    "GU NAME": "Independence Health System"
  },
  {
    "PARTY UNIQUE NAME": "Excelitas Technologies Corporation (FAIRPORT, US)",
    "Rep": "jason.oliveira@oracle.com",
    "DESCRIPTION": "PA: Pittsburgh, Harrisburg, Erie, Malvern",
    "STREET ADDRESS": "2545 Railroad St,Pittsburgh,PA 15222",
    "COUNTRY": "United States",
    "GU NAME": "Aea Investors LLC"
  },
  {
    "PARTY UNIQUE NAME": "Minitab, LLC (State College, US)",
    "Rep": "jason.oliveira@oracle.com",
    "DESCRIPTION": "PA: Pittsburgh, Harrisburg, Erie, Malvern",
    "STREET ADDRESS": "1829 Pine Hall Rd State College,State College,Pennsylvania 16801",
    "COUNTRY": "United States",
    "GU NAME": "Minitab, LLC"
  },
  {
    "PARTY UNIQUE NAME": "Norstella (Yardley, US)",
    "Rep": "jason.oliveira@oracle.com",
    "DESCRIPTION": "PA: Pittsburgh, Harrisburg, Erie, Malvern",
    "STREET ADDRESS": "1020 Stony Hill Rd #150,Yardley,PA 19067",
    "COUNTRY": "United States",
    "GU NAME": "Norstella"
  },
  {
    "PARTY UNIQUE NAME": "Members 1st Federal Credit Union (Mechanicsburg, US)",
    "Rep": "jason.oliveira@oracle.com",
    "DESCRIPTION": "PA: Pittsburgh, Harrisburg, Erie, Malvern",
    "STREET ADDRESS": "Procurement 5000 Louise DrPO Box 40,Mechanicsburg,PA 17055",
    "COUNTRY": "United States",
    "GU NAME": "Members 1st Federal Credit Union"
  },
  {
    "PARTY UNIQUE NAME": "Independence Health System (Greensburg, US)",
    "Rep": "jason.oliveira@oracle.com",
    "DESCRIPTION": "PA: Pittsburgh, Harrisburg, Erie, Malvern",
    "STREET ADDRESS": "Administrative office532 west pittsburgh street,,Greensburg,PA 15601",
    "COUNTRY": "United States",
    "GU NAME": "Independence Health System"
  },
  {
    "PARTY UNIQUE NAME": "Customers Bank (Phoenixville, US)",
    "Rep": "jason.oliveira@oracle.com",
    "DESCRIPTION": "PA: Pittsburgh, Harrisburg, Erie, Malvern",
    "STREET ADDRESS": "99 Bridge St.,Phoenixville,PA 19460",
    "COUNTRY": "United States",
    "GU NAME": "Customers Bancorp, Inc."
  },
  {
    "PARTY UNIQUE NAME": "L. B. Foster Company (PITTSBURGH, US)",
    "Rep": "jason.oliveira@oracle.com",
    "DESCRIPTION": "PA: Pittsburgh, Harrisburg, Erie, Malvern",
    "STREET ADDRESS": "415 Holiday Dr Ste 1,PITTSBURGH,PA 15220",
    "COUNTRY": "United States",
    "GU NAME": "L. B. Foster Company"
  },
  {
    "PARTY UNIQUE NAME": "Wawa Food Markets (Wawa, US)",
    "Rep": "jason.oliveira@oracle.com",
    "DESCRIPTION": "PA: Pittsburgh, Harrisburg, Erie, Malvern",
    "STREET ADDRESS": "Red Roof Baltimore Pike,Wawa,PA 19063",
    "COUNTRY": "United States",
    "GU NAME": "Wawa"
  }
];

const sampleAccounts = sampleRows.map(createAccountFromRecord);

let accounts = [...sampleAccounts];
let selectedAccountId = topAccount(accounts).id;
let selectedPersonaId = recommendedPersona(selectedAccount()).id;
let activeFilter = "all";
let toastTimer = null;

const els = {
  accountRows: document.getElementById("account-rows"),
  accountName: document.getElementById("account-name"),
  accountIndustry: document.getElementById("account-industry"),
  accountScore: document.getElementById("account-score"),
  accountSummary: document.getElementById("account-summary"),
  signalList: document.getElementById("signal-list"),
  personaList: document.getElementById("persona-list"),
  narrative: document.getElementById("oci-narrative"),
  outcomeList: document.getElementById("outcome-list"),
  emailSubject: document.getElementById("email-subject"),
  emailBody: document.getElementById("email-body"),
  emailSources: document.getElementById("email-sources"),
  compactAccount: document.getElementById("active-account-compact"),
  compactPersona: document.getElementById("active-persona-compact"),
  metricAccounts: document.getElementById("metric-accounts"),
  metricIntent: document.getElementById("metric-intent"),
  metricDrafts: document.getElementById("metric-drafts"),
  metricScore: document.getElementById("metric-score"),
  toast: document.getElementById("toast")
};

document.getElementById("load-sample").addEventListener("click", () => {
  accounts = [...sampleAccounts];
  selectedAccountId = topAccount(accounts).id;
  selectedPersonaId = recommendedPersona(selectedAccount()).id;
  activeFilter = "all";
  document.querySelectorAll(".filter-chip").forEach((button) => {
    button.classList.toggle("active", button.dataset.filter === "all");
  });
  render();
  showToast("Sample territory loaded");
});

document.getElementById("csv-upload").addEventListener("change", async (event) => {
  const file = event.target.files[0];
  if (!file) return;
  const text = await file.text();
  const parsed = parseCsvAccounts(text);
  if (!parsed.length) {
    showToast("No account names found");
    return;
  }
  accounts = parsed.map(createAccountFromRecord);
  selectedAccountId = topAccount(accounts).id;
  selectedPersonaId = recommendedPersona(selectedAccount()).id;
  render();
  showToast(`${accounts.length} accounts analyzed`);
  event.target.value = "";
});

document.querySelectorAll(".filter-chip").forEach((button) => {
  button.addEventListener("click", () => {
    activeFilter = button.dataset.filter;
    document.querySelectorAll(".filter-chip").forEach((chip) => {
      chip.classList.toggle("active", chip === button);
    });
    renderAccountRows();
  });
});

document.getElementById("copy-subject").addEventListener("click", () => {
  copyText(els.emailSubject.value, "Subject copied");
});

document.getElementById("copy-full").addEventListener("click", () => {
  copyText(`${els.emailSubject.value}\n\n${els.emailBody.value}`, "Full email copied");
});

function render() {
  renderMetrics();
  renderAccountRows();
  renderDetail();
}

function renderMetrics() {
  const scores = accounts.map((account) => account.score).sort((a, b) => a - b);
  const median = scores.length ? scores[Math.floor(scores.length / 2)] : 0;
  els.metricAccounts.textContent = accounts.length;
  els.metricIntent.textContent = accounts.filter((account) => account.score >= 80).length;
  els.metricDrafts.textContent = accounts.length * personas.length;
  els.metricScore.textContent = median;
}

function renderAccountRows() {
  const visibleAccounts = accounts
    .filter((account) => {
      if (activeFilter === "all") return true;
      if (activeFilter === "high") return account.score >= 80;
      return account.tags.includes(activeFilter);
    })
    .sort((a, b) => b.score - a.score);

  els.accountRows.innerHTML = visibleAccounts.map((account) => {
    const primarySignal = account.signals[0];
    const selected = account.id === selectedAccountId ? " selected" : "";
    return `
      <tr class="account-row${selected}" data-account-id="${account.id}">
        <td>
          <div class="account-main">
            <strong>${escapeHtml(account.name)}</strong>
            <span>${escapeHtml(account.industry)}</span>
          </div>
        </td>
        <td><span class="score-pill ${scoreLevel(account.score)}">${account.score}</span></td>
        <td>
          <div class="signal-summary">${escapeHtml(primarySignal.title)}</div>
        </td>
        <td>
          <strong>${escapeHtml(recommendedPersona(account).label)}</strong>
          <div class="persona-small">${escapeHtml(recommendedPersona(account).focus)}</div>
        </td>
      </tr>
    `;
  }).join("");

  els.accountRows.querySelectorAll(".account-row").forEach((row) => {
    row.addEventListener("click", () => {
      selectedAccountId = row.dataset.accountId;
      selectedPersonaId = recommendedPersona(selectedAccount()).id;
      render();
    });
  });
}

function renderDetail() {
  const account = selectedAccount();
  const persona = selectedPersona();
  els.accountName.textContent = account.name;
  els.accountIndustry.textContent = account.industry;
  els.accountScore.textContent = account.score;
  els.accountSummary.textContent = account.summary;
  els.compactAccount.textContent = account.name;
  els.compactPersona.textContent = persona.label;

  els.signalList.innerHTML = account.signals.map((signal) => `
    <article class="signal-item">
      <div class="signal-topline">
        <strong>${escapeHtml(signal.title)}</strong>
        <span class="signal-type ${escapeHtml(signal.type)}">${escapeHtml(signalLabel(signal.type))}</span>
      </div>
      <p>${escapeHtml(signal.detail)}</p>
      <span class="signal-source">${escapeHtml(signal.source)}</span>
    </article>
  `).join("");

  renderPersonas(account);
  renderNarrative(account, persona);
  renderEmail(account, persona);
}

function renderPersonas(account) {
  const recommended = recommendedPersona(account).id;
  els.personaList.innerHTML = personas.map((persona) => {
    const active = persona.id === selectedPersonaId ? " active" : "";
    const badge = persona.id === recommended ? "Best fit" : "Aligned";
    return `
      <button class="persona-card${active}" type="button" data-persona-id="${persona.id}">
        <strong>${escapeHtml(persona.label)} · ${badge}</strong>
        <span>${escapeHtml(persona.focus)}</span>
      </button>
    `;
  }).join("");

  els.personaList.querySelectorAll(".persona-card").forEach((button) => {
    button.addEventListener("click", () => {
      selectedPersonaId = button.dataset.personaId;
      renderDetail();
    });
  });
}

function renderNarrative(account, persona) {
  const signalNames = account.signals.slice(0, 2).map((signal) => signal.title.toLowerCase()).join(" and ");
  els.narrative.textContent = `${account.name} is showing territory signals around ${signalNames}. For a ${persona.label}, the OCI story should ${persona.hook}. The right outreach should connect the imported account record, the ${account.groupName} GU context, and the local ${account.territory} patch to a practical next step: ${account.ociWedge}.`;
  els.outcomeList.innerHTML = account.outcomes.map(([term, value]) => `
    <div>
      <dt>${escapeHtml(term)}</dt>
      <dd>${escapeHtml(value)}</dd>
    </div>
  `).join("");
}

function renderEmail(account, persona) {
  const primary = account.signals[0];
  const subject = `${account.groupName}: OCI conversation for ${account.location}`;
  const body = [
    `Hi {{first_name}},`,
    "",
    `I am working through the ${account.territory} territory and noticed ${account.name} is tied to ${account.groupName}${account.location ? ` in ${account.location}` : ""}. The imported account record gives us a practical starting point: ${primary.detail}`,
    "",
    `For a ${persona.label}, I think the relevant OCI conversation is how to ${persona.hook}. The wedge I would lead with is ${account.ociWedge}, then validate which workload or initiative matters most right now.`,
    "",
    "Would it be useful to compare notes for 20 minutes and identify one workload or initiative where OCI could support the outcome your team is already pursuing?",
    "",
    "Best,",
    "{{your_name}}"
  ].join("\n");

  els.emailSubject.value = subject;
  els.emailBody.value = body;
  els.emailSources.textContent = `Signals used: ${account.signals.map((signal) => `${signal.title} (${signal.source})`).join("; ")}. Draft requires rep review before sending.`;
}

function selectedAccount() {
  return accounts.find((account) => account.id === selectedAccountId) || accounts[0];
}

function topAccount(accountList) {
  return [...accountList].sort((a, b) => b.score - a.score)[0] || accountList[0];
}

function selectedPersona() {
  return personas.find((persona) => persona.id === selectedPersonaId) || personas[0];
}

function recommendedPersona(account) {
  if (account.targetPersonaId) return personas.find((persona) => persona.id === account.targetPersonaId) || personas[0];
  const text = `${account.name} ${account.groupName} ${account.industry} ${account.accountFit} ${account.ociWedge}`.toLowerCase();
  if (/(data & ai|data\/ai|gpu\/ai|gpu|ai\/robotics|data science|forecasting|real-world data|robotics|vision)/.test(text)) {
    return personas.find((persona) => persona.id === "data-ai");
  }
  if (/(bank|credit|financial|regulated|health|insurance|ransomware|compliance|secure|security)/.test(text)) {
    return personas.find((persona) => persona.id === "ciso");
  }
  if (account.tags.includes("modernization")) return personas.find((persona) => persona.id === "vp-infra");
  return personas[0];
}

function scoreLevel(score) {
  if (score >= 80) return "high";
  if (score >= 70) return "medium";
  return "low";
}

function signalLabel(type) {
  const labels = {
    ai: "AI",
    cost: "Cost",
    security: "Security",
    modernization: "Modernization"
  };
  return labels[type] || type;
}

function parseCsvAccounts(text) {
  const lines = text.split(/\r?\n/).map((line) => line.trim()).filter(Boolean);
  if (!lines.length) return [];
  const first = splitCsvLine(lines[0]).map(normalizeHeader);
  const hasHeader = first.some((value) => ["partyuniquename", "account", "accountname", "company", "companyname", "name"].includes(value));
  const header = hasHeader ? first : [];
  const dataLines = hasHeader ? lines.slice(1) : lines;
  const records = dataLines.map((line) => {
    const values = splitCsvLine(line);
    if (!hasHeader) return { account: values[0] || "" };
    return header.reduce((record, key, index) => {
      record[key] = values[index] || "";
      return record;
    }, {});
  });
  const seen = new Set();
  return records.filter((record) => {
    const name = accountNameFromRecord(record);
    if (!name || seen.has(name.toLowerCase())) return false;
    seen.add(name.toLowerCase());
    return true;
  }).slice(0, 50);
}

function splitCsvLine(line) {
  const values = [];
  let current = "";
  let quoted = false;
  for (let index = 0; index < line.length; index += 1) {
    const char = line[index];
    const next = line[index + 1];
    if (char === '"' && quoted && next === '"') {
      current += '"';
      index += 1;
    } else if (char === '"') {
      quoted = !quoted;
    } else if (char === "," && !quoted) {
      values.push(current.trim());
      current = "";
    } else {
      current += char;
    }
  }
  values.push(current.trim());
  return values.map((value) => value.replace(/^"|"$/g, ""));
}

function createAccountFromRecord(record, index) {
  const cleanName = accountNameFromRecord(record) || `Uploaded Account ${index + 1}`;
  const groupName = valueFromRecord(record, ["guname", "gu", "globalultimate", "parentaccount"]) || cleanCompanyName(cleanName);
  const rep = valueFromRecord(record, ["rep", "salesrep", "owner"]) || "Unassigned rep";
  const territory = valueFromRecord(record, ["description", "territory", "territorydescription"]) || "Imported territory";
  const streetAddress = valueFromRecord(record, ["streetaddress", "address", "street"]) || "Address not provided";
  const country = valueFromRecord(record, ["country"]) || "Country not provided";
  const location = locationFromRecord(cleanName, streetAddress);
  const industry = valueFromRecord(record, ["industry"]) || inferIndustry(`${cleanName} ${groupName}`);
  const explicitFit = valueFromRecord(record, ["whythishas500karrpotential", "whythishasarrpotential", "arrpotential", "territorynotes", "notes"]);
  const accountFit = explicitFit || `${cleanName} is a ${country} territory record assigned to ${rep}, mapped to ${groupName}, and located at ${streetAddress}.`;
  const ociWedge = valueFromRecord(record, ["bestociwedge", "ociwedge", "wedge", "usecase"]) || inferOciWedge(industry, `${cleanName} ${groupName}`);
  const targetPersonaId = personaIdFromText(valueFromRecord(record, ["targetpersona", "persona"]));
  const rank = Number(valueFromRecord(record, ["rank"]));
  const tags = tagsFromText(`${cleanName} ${groupName} ${industry} ${accountFit} ${ociWedge}`);
  return {
    id: slugify(cleanName),
    name: cleanName,
    industry,
    score: rank ? scoreFromRank(rank) : scoreFromProfile(`${cleanName} ${groupName}`, industry, index),
    owner: rep,
    rank: rank || index + 1,
    groupName,
    rep,
    territory,
    streetAddress,
    country,
    location,
    accountFit,
    ociWedge,
    targetPersonaId,
    tags,
    summary: `${cleanName} is an imported territory account for ${territory}, assigned to ${rep}. The record maps to ${groupName} and gives the rep a focused local entry point for ${ociWedge}.`,
    signals: [
      {
        type: "modernization",
        title: "Territory assignment",
        detail: `${rep} owns this record in ${territory}.`,
        source: "Uploaded territory workbook"
      },
      {
        type: tags.includes("security") ? "security" : tags[0] || "modernization",
        title: "GU and location context",
        detail: `${cleanName} rolls up to ${groupName}; address: ${streetAddress}; country: ${country}.`,
        source: "Uploaded territory workbook"
      },
      {
        type: tags.includes("ai") ? "ai" : tags.includes("security") ? "security" : "modernization",
        title: "Suggested OCI wedge",
        detail: ociWedge,
        source: "Generated from workbook fields"
      }
    ],
    outcomes: outcomesFromWedge(ociWedge)
  };
}

function accountNameFromRecord(record) {
  return valueFromRecord(record, ["partyuniquename", "account", "accountname", "company", "companyname", "name"]);
}

function valueFromRecord(record, keys) {
  for (const key of keys) {
    if (record[key]) return String(record[key]).trim();
    const matchingKey = Object.keys(record).find((recordKey) => normalizeHeader(recordKey) === key);
    if (matchingKey && record[matchingKey]) return String(record[matchingKey]).trim();
  }
  return "";
}

function normalizeHeader(value) {
  return String(value).toLowerCase().replace(/[^a-z0-9]+/g, "");
}

function scoreFromRank(rank) {
  return Math.max(68, Math.min(98, 101 - rank * 3));
}

function scoreFromProfile(name, industry, index) {
  const text = `${name} ${industry}`.toLowerCase();
  let score = 76;
  if (/norstella/.test(text)) score = 96;
  else if (/customers|capital blue|members 1st|bank|credit|financial/.test(text)) score = 92;
  else if (/wawa|retail/.test(text)) score = 90;
  else if (/independence|hospital|health|insurance/.test(text)) score = 88;
  else if (/seegrid|excelitas|minitab|robotics|software|technology/.test(text)) score = 86;
  else if (/foster|industrial|manufacturing/.test(text)) score = 82;
  return Math.max(68, Math.min(98, score - Math.min(index % 3, 2)));
}

function cleanCompanyName(value) {
  return String(value).replace(/\s*\([^)]*\)\s*$/, "").trim();
}

function locationFromRecord(name, address) {
  const partyLocation = String(name).match(/\(([^)]+)\)/);
  if (partyLocation) return titleCase(partyLocation[1].replace(", US", ""));
  const parts = String(address).split(",").map((part) => part.trim()).filter(Boolean);
  if (parts.length >= 2) return titleCase(parts[parts.length - 2]);
  return "";
}

function inferIndustry(value) {
  const text = String(value).toLowerCase();
  if (/norstella/.test(text)) return "Life Sciences / Data & AI";
  if (/capital blue|insurance/.test(text)) return "Health / Insurance";
  if (/customers|bancorp|members 1st|bank|credit union/.test(text)) return "Financial Services";
  if (/clarion|butler|independence|hospital|health/.test(text)) return "Health";
  if (/wawa|food markets/.test(text)) return "Retail";
  if (/seegrid|robotics/.test(text)) return "Industrial Manufacturing / Robotics";
  if (/excelitas/.test(text)) return "High Technology / Industrial Manufacturing";
  if (/minitab/.test(text)) return "High Technology / Software";
  if (/foster/.test(text)) return "Industrial Manufacturing";
  return "General Business";
}

function inferOciWedge(industry, value) {
  const text = `${industry} ${value}`.toLowerCase();
  if (/life sciences|data & ai|norstella/.test(text)) return "OCI Data Science, GPU/AI, Autonomous Database, secure analytics platform";
  if (/financial|bank|credit|bancorp/.test(text)) return "secure AI/data platform, regulated workloads, DR, database modernization";
  if (/health \/ insurance|capital blue/.test(text)) return "secure payer data platform, analytics, DR, compliance landing zone";
  if (/health|hospital|independence/.test(text)) return "healthcare DR, ransomware resilience, VMware, secure landing zone";
  if (/retail|wawa/.test(text)) return "retail analytics, app modernization, DR, data platform";
  if (/robotics|seegrid/.test(text)) return "AI/robotics data platform, GPU/vision workloads, telemetry analytics";
  if (/software|minitab/.test(text)) return "SaaS infrastructure, database, analytics workloads, cloud cost optimization";
  if (/technology|excelitas/.test(text)) return "HPC/engineering workloads, AI/vision, data platform, secure manufacturing workloads";
  if (/industrial|manufacturing|foster/.test(text)) return "industrial data platform, IoT/monitoring analytics, VMware, DR";
  return "cloud modernization, secure data platform, database modernization, DR";
}

function personaIdFromText(value) {
  const text = String(value || "").toLowerCase();
  if (text.includes("ciso") || text.includes("security")) return "ciso";
  if (text.includes("data") || text.includes("ai")) return "data-ai";
  if (text.includes("infra") || text.includes("infrastructure")) return "vp-infra";
  if (text.includes("cio")) return "cio";
  return "";
}

function tagsFromText(value) {
  const text = String(value).toLowerCase();
  const tags = [];
  if (/(ai|gpu|data science|analytics|forecasting|robotics|vision|lakehouse|machine learning|real-world data)/.test(text)) tags.push("ai");
  if (/(secure|regulated|compliance|ransomware|bank|credit|health|insurance|dr|disaster recovery|landing zone)/.test(text)) tags.push("security");
  if (/(modernization|database|vmware|saas|app hosting|edge|store systems|workloads|hpc|engineering|iot|monitoring)/.test(text)) tags.push("modernization");
  if (/(cost|performance|optimization|arr|operating-model|operating model)/.test(text)) tags.push("cost");
  return tags.length ? [...new Set(tags)] : ["modernization"];
}

function outcomesFromWedge(wedge) {
  const parts = wedge.split(",").map((part) => part.trim()).filter(Boolean).slice(0, 4);
  return parts.map((part) => [
    part.length > 22 ? `${part.slice(0, 21)}...` : part,
    `Use ${part} to connect the account's public buying signal to a concrete OCI next step.`
  ]);
}

function slugify(value) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || `account-${Date.now()}`;
}

function titleCase(value) {
  return String(value).toLowerCase().replace(/\b[a-z]/g, (letter) => letter.toUpperCase());
}

async function copyText(text, message) {
  try {
    await navigator.clipboard.writeText(text);
    showToast(message);
  } catch (error) {
    const temp = document.createElement("textarea");
    temp.value = text;
    document.body.appendChild(temp);
    temp.select();
    document.execCommand("copy");
    temp.remove();
    showToast(message);
  }
}

function showToast(message) {
  clearTimeout(toastTimer);
  els.toast.textContent = message;
  els.toast.classList.add("show");
  toastTimer = setTimeout(() => {
    els.toast.classList.remove("show");
  }, 1900);
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

render();
