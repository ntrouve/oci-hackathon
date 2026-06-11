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
    rank: "1",
    account: "Norstella",
    industry: "Life Sciences / Data & AI",
    arrPotential: "Strongest data/AI fit in the whole list. Norstella positions itself around life-sciences data, real-world data, AI, forecasting, trial design, market access, and patient activation, which maps directly to high-value OCI data, AI, GPU, and database conversations.",
    ociWedge: "OCI Data Science, GPU/AI, Autonomous Database, data lakehouse, secure analytics platform"
  },
  {
    rank: "2",
    account: "Customers Bank",
    industry: "Financial Services",
    arrPotential: "Large regulated financial institution with current AI transformation momentum. Customers Bank recently announced a multiyear OpenAI collaboration and described itself as having nearly $26B in assets, which suggests executive appetite for AI-enabled operating-model change.",
    ociWedge: "Secure AI/data platform, regulated workloads, DR, database modernization"
  },
  {
    rank: "3",
    account: "Wawa Food Markets",
    industry: "Retail",
    arrPotential: "Large multi-location convenience, fuel, food, mobile ordering, loyalty, and store-operations profile. Wawa's site emphasizes store locations, ordering, delivery, fleet cards, fuel, and EV charging, all of which point to high-volume operational data and customer-facing digital systems.",
    ociWedge: "Retail analytics, app modernization, DR, data platform, edge/store systems"
  },
  {
    rank: "4",
    account: "Independence Health System",
    industry: "Health",
    arrPotential: "Strong regulated healthcare opportunity with enough scale for a meaningful OCI deal. Independence Health says it includes five hospitals, 925 beds, more than 1,000 providers, and 7,300 employees.",
    ociWedge: "Healthcare DR, ransomware resilience, VMware, secure landing zone, database workloads"
  },
  {
    rank: "5",
    account: "Excelitas Technologies",
    industry: "High Technology / Industrial Manufacturing",
    arrPotential: "Advanced photonics, sensing, imaging, optics, semiconductor, aerospace/defense, life sciences, and industrial automation profile. Excelitas explicitly serves life sciences, advanced industrial, next-gen semiconductor, aerospace/defense, AI, IoT, and precision medicine markets.",
    ociWedge: "HPC/engineering workloads, AI/vision, data platform, secure manufacturing workloads"
  },
  {
    rank: "6",
    account: "Capital Blue Cross",
    industry: "Health / Insurance",
    arrPotential: "Health insurance payer profile means regulated member data, claims, analytics, compliance, security, and digital engagement workloads. This is a good fit for a higher-ARR data/security/DR play, though sales cycles may be slower than pure tech accounts.",
    ociWedge: "Secure data platform, analytics, DR, compliance landing zone, database modernization"
  },
  {
    rank: "7",
    account: "Minitab",
    industry: "High Technology / Software",
    arrPotential: "Software and analytics company with cloud product motion. Minitab markets statistical software, predictive analytics, and cloud-enabled data analysis, which makes OCI cost/performance, database, and application hosting relevant.",
    ociWedge: "SaaS infrastructure, database, analytics workloads, cloud cost optimization"
  },
  {
    rank: "8",
    account: "Seegrid Corporation",
    industry: "Industrial Manufacturing / Robotics",
    arrPotential: "Robotics and autonomous mobile robot company with data, automation, fleet, AI/vision, and industrial operations fit. Seegrid positions itself around autonomous material handling, manufacturing, warehousing, and scalable AMR deployments.",
    ociWedge: "AI/robotics data platform, GPU/vision workloads, app hosting, telemetry analytics"
  },
  {
    rank: "9",
    account: "Members 1st Federal Credit Union",
    industry: "Financial Services",
    arrPotential: "Credit union with broad branch footprint in Pennsylvania and regulated member-data needs. Its branch/ATM locator shows many locations across PA, which points to digital banking, security, DR, and distributed operations needs.",
    ociWedge: "DR, secure banking workloads, data analytics, database modernization"
  },
  {
    rank: "10",
    account: "L.B. Foster Company",
    industry: "Industrial Manufacturing",
    arrPotential: "Infrastructure, rail, monitoring, and industrial technology profile with likely operational, engineering, and field-data workloads. L.B. Foster describes rail products, friction management, total track monitoring, technologies, and critical rail infrastructure/safety solutions.",
    ociWedge: "Industrial data platform, IoT/monitoring analytics, VMware, DR, database workloads"
  }
];

const sampleAccounts = sampleRows.map(createAccountFromRecord);

let accounts = [...sampleAccounts];
let selectedAccountId = accounts[0].id;
let selectedPersonaId = recommendedPersona(accounts[0]).id;
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
  selectedAccountId = accounts[0].id;
  selectedPersonaId = recommendedPersona(accounts[0]).id;
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
  selectedAccountId = accounts[0].id;
  selectedPersonaId = recommendedPersona(accounts[0]).id;
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
  els.narrative.textContent = `${account.name} is showing credible public signals around ${signalNames}. For a ${persona.label}, the OCI story should ${persona.hook}. The right outreach is not a generic cloud pitch; it should connect the account's public priorities to a practical next step: ${account.ociWedge || "a focused architecture conversation, workload fit review, or AI/data readiness workshop"}.`;
  els.outcomeList.innerHTML = account.outcomes.map(([term, value]) => `
    <div>
      <dt>${escapeHtml(term)}</dt>
      <dd>${escapeHtml(value)}</dd>
    </div>
  `).join("");
}

function renderEmail(account, persona) {
  const primary = account.signals[0];
  const secondary = account.signals[1] || account.signals[0];
  const subject = `${account.name}: connecting ${primary.title.toLowerCase()} to OCI outcomes`;
  const body = [
    `Hi {{first_name}},`,
    "",
    `I noticed ${account.name} is a strong fit for an OCI conversation because ${account.arrPotential || `${primary.title.toLowerCase()} and ${secondary.title.toLowerCase()} are showing up as account signals`}`,
    "",
    `For a ${persona.label}, I think the relevant OCI conversation is how to ${persona.hook}. The wedge I would lead with is ${account.ociWedge || "cloud infrastructure, data services, AI readiness, and operating controls"}, depending on which workloads matter most right now.`,
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

function selectedPersona() {
  return personas.find((persona) => persona.id === selectedPersonaId) || personas[0];
}

function recommendedPersona(account) {
  if (account.targetPersonaId) return personas.find((persona) => persona.id === account.targetPersonaId) || personas[0];
  const text = `${account.industry} ${account.arrPotential} ${account.ociWedge}`.toLowerCase();
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
  const hasHeader = first.some((value) => ["account", "accountname", "company", "companyname", "name"].includes(value));
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
  const rank = Number(record.rank) || index + 1;
  const industry = valueFromRecord(record, ["industry"]) || "Unknown industry";
  const arrPotential = valueFromRecord(record, ["whythishas500karrpotential", "whythishasarrpotential", "arrpotential", "territorynotes", "notes"]) || `${cleanName} has been enriched with a demo signal profile based on public-account research patterns.`;
  const ociWedge = valueFromRecord(record, ["bestociwedge", "ociwedge", "wedge", "usecase"]) || "OCI data platform, AI services, database modernization, and resilient infrastructure";
  const targetPersonaId = personaIdFromText(valueFromRecord(record, ["targetpersona", "persona"]));
  const tags = tagsFromText(`${industry} ${arrPotential} ${ociWedge}`);
  return {
    id: slugify(cleanName),
    name: cleanName,
    industry,
    score: scoreFromRank(rank),
    owner: `Rank #${rank} ARR opportunity`,
    rank,
    arrPotential,
    ociWedge,
    targetPersonaId,
    tags,
    summary: arrPotential,
    signals: [
      {
        type: tags[0] || "modernization",
        title: `$500K ARR potential`,
        detail: arrPotential,
        source: `Uploaded account ranking #${rank}`
      },
      {
        type: tags[1] || tags[0] || "modernization",
        title: "Best OCI wedge",
        detail: ociWedge,
        source: "Account planning CSV"
      },
      {
        type: tags.includes("security") ? "security" : "modernization",
        title: "Account priority",
        detail: `${cleanName} is ranked #${rank} in the uploaded territory plan, indicating a high-priority outreach motion for this patch.`,
        source: "Territory prioritization"
      }
    ],
    outcomes: outcomesFromWedge(ociWedge)
  };
}

function accountNameFromRecord(record) {
  return valueFromRecord(record, ["account", "accountname", "company", "companyname", "name"]);
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
