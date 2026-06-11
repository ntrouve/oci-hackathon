# Territory Signal Copilot

Territory Signal Copilot is a hackathon MVP for OCI sales reps entering a new territory. It turns an uploaded account list into a signal-ranked prospecting workspace with OCI narratives, persona recommendations, and copyable email drafts.

## Live Demo

https://129-146-81-29.sslip.io/

## Demo Workflow

1. Upload a CSV of accounts or load the sample territory.
2. Review accounts ranked by buying-signal strength.
3. Open an account to inspect public-signal evidence.
4. Select a buying-committee persona.
5. Review the OCI narrative and copy the email draft.

## CSV Format

The app is optimized for this account-prioritization CSV format:

```csv
Rank,Account,Industry,Why this has $500K ARR potential,Best OCI wedge
1,Norstella,Life Sciences / Data & AI,"Strongest data/AI fit in the whole list...","OCI Data Science, GPU/AI, Autonomous Database, data lakehouse, secure analytics platform"
2,Customers Bank,Financial Services,"Large regulated financial institution with current AI transformation momentum...","Secure AI/data platform, regulated workloads, DR, database modernization"
```

Required:

- `Account`

Recommended:

- `Rank`
- `Industry`
- `Why this has $500K ARR potential`
- `Best OCI wedge`

The parser remains backward-compatible with simple files that only include `account`, `account name`, `company`, `company name`, or `name`.

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
- `app/main.js`: sample data, CSV parsing, account selection, persona logic, and copy actions
- `sample-accounts.csv`: example upload file
