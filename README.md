# Territory Signal Copilot

Territory Signal Copilot is a hackathon MVP for OCI sales reps entering a new territory. It turns an uploaded territory account file into a signal-ranked prospecting workspace with OCI narratives, persona recommendations, and copyable email drafts.

## Live Demo

https://129-146-81-29.sslip.io/

## Demo Workflow

1. Upload a CSV exported from the territory workbook or load the sample territory.
2. Review account records ranked by buying-signal strength.
3. Open an account to inspect territory and enrichment signals.
4. Select a buying-committee persona.
5. Review the OCI narrative and copy the email draft.

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
- `app/main.js`: sample data, CSV parsing, account selection, persona logic, and copy actions
- `sample-accounts.csv`: example upload file
