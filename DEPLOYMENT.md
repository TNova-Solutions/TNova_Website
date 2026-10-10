# TNova Website — setup & deployment

## Local development
```bash
npm run install:all          # installs client + server (the old script named "install" was renamed; it re-ran on every npm install)
cp server/.env.example server/.env   # set DATABASE_URL (optional locally: the site works without a DB, but the contact form returns 503)
npm run dev                  # API on :5000, site on :5173 (Vite proxies /api)
npm test                     # server + client tests
npm run lint
```

## Editing site content
Copy lives in `server/src/db/data.js`. After editing run `npm run sync:content` (regenerates the client's bundled fallback).
With `CONTENT_SYNC=true` (default) the server writes data.js into the database on startup, so deploying the server is enough to publish copy changes.

### Going live with the Internal Hub / Interview Platform cards
In `data.js` → `Products.items[n]`: set `liveUrl: "https://your-app-url"`, `status: "Live"`, `statusType: "live"`.
The card button switches from "Request early access" to "Open app". Do this only once the product is actually live.

## Production (Vercel, two projects as today)
**Server project** (root dir `server/`)
- `DATABASE_URL` — **required**; without it the contact form returns 503 rather than silently dropping leads
- `CORS_ORIGINS=https://www.tnovasolutions.com` — restrict the API to your site
- optional: `PGSSL_STRICT=true` once your DB provider's certificate verifies, `CONTENT_SYNC`, `CONTACT_RATE_LIMIT`

**Client project** (root dir `client/`)
- `VITE_API_BASE_URL=https://<your-server>.vercel.app`
- `vercel.json` (included) adds the SPA rewrite so deep links / refreshes don't 404, plus security + cache headers.

## Reading contact leads
`SELECT * FROM contact_submissions ORDER BY received_at DESC;`  (columns: name, email, message, interest, received_at)
There is no email notification yet — see "Next steps" in the review.
