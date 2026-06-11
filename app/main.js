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

const sampleAccounts = [
  {
    id: "acme-retail",
    name: "Acme Retail Group",
    industry: "Retail",
    score: 92,
    owner: "Southwest enterprise territory",
    tags: ["ai", "cost", "modernization"],
    summary: "Acme is investing in digital shopping experiences while publicly discussing margin pressure and fulfillment speed. That combination creates a strong OCI conversation around AI services, data platforms, and cost-efficient cloud infrastructure.",
    signals: [
      {
        type: "ai",
        title: "AI shopping assistant pilot",
        detail: "Public product blog describes a pilot for personalized product discovery and automated customer support.",
        source: "Company blog, May 2026"
      },
      {
        type: "cost",
        title: "Margin pressure in earnings commentary",
        detail: "Recent earnings remarks emphasized operating leverage, store technology efficiency, and lower digital fulfillment costs.",
        source: "Public earnings transcript"
      },
      {
        type: "modernization",
        title: "Data platform hiring",
        detail: "Open roles reference streaming analytics, real-time inventory, and cloud data engineering.",
        source: "Public careers page"
      }
    ],
    outcomes: [
      ["AI at scale", "OCI AI infrastructure and data services can support recommendation and service-assist workloads."],
      ["Cost control", "OCI compute and autonomous data options can support lower-cost modernization paths."],
      ["Operational resilience", "Distributed services and observability can help keep digital commerce workflows available."],
      ["Data readiness", "A governed data platform can connect inventory, customer, and fulfillment signals."]
    ]
  },
  {
    id: "heliobank",
    name: "HelioBank",
    industry: "Financial Services",
    score: 88,
    owner: "Strategic financial services patch",
    tags: ["security", "ai", "modernization"],
    summary: "HelioBank is modernizing digital banking while discussing fraud prevention and regulatory scrutiny. OCI can be positioned around secure modernization, governed AI, and resilient transaction platforms.",
    signals: [
      {
        type: "security",
        title: "Fraud analytics initiative",
        detail: "Executive interview highlighted AI-assisted fraud detection and stronger customer identity controls.",
        source: "Industry interview"
      },
      {
        type: "modernization",
        title: "Core platform modernization",
        detail: "Technology roadmap references API modernization and cloud-native digital banking services.",
        source: "Investor technology update"
      },
      {
        type: "ai",
        title: "Data science hiring surge",
        detail: "Public roles mention model governance, MLOps, and real-time risk scoring.",
        source: "Public job postings"
      }
    ],
    outcomes: [
      ["Governed AI", "OCI can support model operations with controls that fit regulated financial workflows."],
      ["Resilience", "Cloud architecture conversations can center on availability and transaction continuity."],
      ["Security posture", "OCI security services can reinforce identity, network, and data protection priorities."],
      ["Modern integration", "API and data modernization can reduce friction across digital banking products."]
    ]
  },
  {
    id: "northstar-health",
    name: "Northstar Health",
    industry: "Healthcare",
    score: 84,
    owner: "Healthcare growth accounts",
    tags: ["ai", "security"],
    summary: "Northstar Health is exploring clinical AI and patient engagement while operating in a high-trust compliance environment. OCI can help frame an outcome around secure AI infrastructure and data governance.",
    signals: [
      {
        type: "ai",
        title: "Clinical AI partnership",
        detail: "Public announcement describes AI pilots for care team productivity and patient message triage.",
        source: "Press release"
      },
      {
        type: "security",
        title: "Data privacy modernization",
        detail: "Leadership comments emphasize patient data protection and auditability.",
        source: "Public leadership Q&A"
      },
      {
        type: "modernization",
        title: "EHR analytics expansion",
        detail: "Hiring signals point to cloud analytics and interoperability engineering.",
        source: "Public careers page"
      }
    ],
    outcomes: [
      ["Secure AI", "OCI can support AI workloads with a security and governance-first architecture."],
      ["Clinical productivity", "AI services and data platforms can support workflows that reduce manual review burden."],
      ["Compliance", "A clear control model helps keep sensitive data use auditable."],
      ["Interoperability", "Modern integration services can help connect patient, clinical, and operational data."]
    ]
  },
  {
    id: "summit-manufacturing",
    name: "Summit Manufacturing",
    industry: "Industrial Manufacturing",
    score: 76,
    owner: "Manufacturing territory",
    tags: ["cost", "modernization"],
    summary: "Summit is focused on plant productivity, supply chain visibility, and ERP modernization. OCI can connect operational data, analytics, and infrastructure modernization to measurable uptime and cost outcomes.",
    signals: [
      {
        type: "cost",
        title: "Downtime reduction goal",
        detail: "Public operations update calls out equipment uptime and production efficiency as board-level priorities.",
        source: "Annual operations report"
      },
      {
        type: "modernization",
        title: "ERP modernization planning",
        detail: "Open program roles reference integration, cloud migration, and manufacturing data hubs.",
        source: "Public job postings"
      },
      {
        type: "ai",
        title: "Predictive maintenance interest",
        detail: "Conference session summary mentions analytics pilots for predictive maintenance.",
        source: "Conference agenda"
      }
    ],
    outcomes: [
      ["Uptime", "OCI data and analytics services can support predictive maintenance and plant visibility."],
      ["ERP path", "OCI can support modernization with integration patterns that reduce migration risk."],
      ["Cost efficiency", "Infrastructure consolidation and workload tuning can support lower operating costs."],
      ["Supply chain insight", "Connected data can improve planning and exception management."]
    ]
  },
  {
    id: "pinnacle-utilities",
    name: "Pinnacle Utilities",
    industry: "Energy & Utilities",
    score: 71,
    owner: "Utilities named accounts",
    tags: ["security", "cost"],
    summary: "Pinnacle Utilities is publicly focused on grid resilience, cyber risk, and infrastructure efficiency. OCI can be positioned around secure data platforms, operational resilience, and modernization economics.",
    signals: [
      {
        type: "security",
        title: "Grid cyber resilience program",
        detail: "Public plan emphasizes stronger cyber controls for operational technology and customer systems.",
        source: "Regulatory filing"
      },
      {
        type: "cost",
        title: "Capital efficiency pressure",
        detail: "Recent public filing notes cost discipline across infrastructure investments.",
        source: "Public financial filing"
      },
      {
        type: "modernization",
        title: "Data center consolidation",
        detail: "Technology roadmap mentions consolidating legacy platforms and improving disaster recovery.",
        source: "Public roadmap summary"
      }
    ],
    outcomes: [
      ["Resilience", "OCI infrastructure can support disaster recovery and critical workload continuity."],
      ["Security", "OCI security controls can help frame cyber risk reduction across cloud workloads."],
      ["Cost discipline", "Modernized platforms can reduce legacy infrastructure drag."],
      ["Data visibility", "A governed data foundation can support grid and customer operations insight."]
    ]
  }
];

let accounts = [...sampleAccounts];
let selectedAccountId = accounts[0].id;
let selectedPersonaId = personas[0].id;
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
  selectedPersonaId = personas[0].id;
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
  accounts = parsed.map(createAccountFromName);
  selectedAccountId = accounts[0].id;
  selectedPersonaId = personas[0].id;
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
  els.narrative.textContent = `${account.name} is showing credible public signals around ${signalNames}. For a ${persona.label}, the OCI story should ${persona.hook}. The right outreach is not a generic cloud pitch; it should connect the account's public priorities to a practical next step: a focused architecture conversation, workload fit review, or AI/data readiness workshop.`;
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
    `I noticed ${account.name} has been publicly discussing ${primary.title.toLowerCase()} and ${secondary.title.toLowerCase()}. For ${account.industry.toLowerCase()} teams, those signals usually create a practical question: how do we move faster without adding infrastructure complexity, cost, or risk?`,
    "",
    `For a ${persona.label}, I think the relevant OCI conversation is how to ${persona.hook}. OCI can help frame the path across cloud infrastructure, data services, AI readiness, and operating controls, depending on which workloads matter most right now.`,
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
  if (account.tags.includes("security")) return personas.find((persona) => persona.id === "ciso");
  if (account.tags.includes("ai")) return personas.find((persona) => persona.id === "data-ai");
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
  const first = splitCsvLine(lines[0]).map((value) => value.toLowerCase());
  const hasHeader = first.some((value) => ["account", "account name", "company", "company name", "name"].includes(value));
  const header = hasHeader ? first : [];
  const accountIndex = hasHeader
    ? Math.max(header.findIndex((value) => ["account", "account name", "company", "company name", "name"].includes(value)), 0)
    : 0;
  const dataLines = hasHeader ? lines.slice(1) : lines;
  return [...new Set(dataLines.map((line) => splitCsvLine(line)[accountIndex]).filter(Boolean))].slice(0, 50);
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

function createAccountFromName(name, index) {
  const templates = sampleAccounts[index % sampleAccounts.length];
  const cleanName = name || `Uploaded Account ${index + 1}`;
  return {
    ...templates,
    id: slugify(cleanName),
    name: cleanName,
    score: Math.max(64, Math.min(96, templates.score - (index % 5) * 3)),
    summary: `${cleanName} has been enriched with a demo signal profile based on public-account research patterns. Replace these seeded signals with live research output when the ingestion pipeline is connected.`,
    signals: templates.signals.map((signal) => ({ ...signal })),
    outcomes: templates.outcomes.map((outcome) => [...outcome])
  };
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
