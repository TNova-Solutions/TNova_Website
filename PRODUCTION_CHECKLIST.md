# TNova website — production checklist

## 1. Set these Vercel environment variables (server project)
| Variable | Value |
|---|---|
| `DATABASE_URL` | your Postgres connection string (already set) |
| `SMTP_USER` | mailbox that sends mail, e.g. `info@tnovasolutions.com` (must exist in Zoho) |
| `SMTP_PASS` | Zoho **app-specific password** (Zoho → My Account → Security → App Passwords) |
| `SMTP_HOST` | `smtp.zoho.in` (India DC, default) or `smtp.zoho.com` (global DC) |
| `MAIL_TO` | inbox that receives enquiries (defaults to `SMTP_USER`) |
| `ALLOWED_ORIGINS` | `https://www.tnovasolutions.com,https://tnovasolutions.com` |

## 2. Verify email BEFORE deploying
```bash
cd server && cp .env.example .env   # fill in real values
npm run verify:mail                          # checks host, port, TLS, login
npm run verify:mail -- --send you@gmail.com  # sends a real test email
```

## 3. After deploying
- `GET /api/health` → `{"status":"ok","database":{"ready":true},"mail":{"configured":true}}`
- Submit the live contact form once; confirm the team email arrives AND the visitor acknowledgement arrives.
- In Postgres: `SELECT id, email, mail_status FROM contact_submissions ORDER BY id DESC LIMIT 5;`
  (`sent` / `notified_only` / `failed`)
- The client project is deployed from `client/` and now includes `vercel.json` so `/development`
  survives a browser refresh.

## 4. Tests
`npm run test` from the repo root runs the server (24) and client (31) suites.
