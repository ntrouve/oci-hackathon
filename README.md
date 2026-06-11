# Territory Signal Copilot

Territory Signal Copilot is a hackathon MVP for OCI sales reps entering a new territory. It turns an uploaded account list into a signal-ranked prospecting workspace with OCI narratives, persona recommendations, and copyable email drafts.

## Demo Workflow

1. Upload a CSV of accounts or load the sample territory.
2. Review accounts ranked by buying-signal strength.
3. Open an account to inspect public-signal evidence.
4. Select a buying-committee persona.
5. Review the OCI narrative and copy the email draft.

## CSV Format

The app currently accepts a simple CSV with an account/company/name column:

```csv
account,website,industry,segment,territory_notes,target_persona
Acme Retail Group,https://acme.example,Retail,Enterprise,"AI commerce and margin pressure",CIO
HelioBank,https://helio.example,Financial Services,Strategic,"Fraud analytics and platform modernization",CISO
```

Only the account name is required today. Extra columns are safe to include and can be wired into future enrichment logic.

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
