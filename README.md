# Placement Portal — MERN

## Requirements
- Node.js 20+ (recommended)
- MongoDB running locally on port 27017, or MongoDB Atlas connection string

## Setup (VS Code)
1. Open the `placement-portal` folder in VS Code.
2. In `server`, copy `.env.example` to `.env`. Set `MONGO_URI`, a long random `JWT_SECRET`, and `ADMIN_PASSWORD`.
3. In a terminal: `cd server && npm install && npm run seed && npm run dev`.
4. In a **second terminal**: `cd client && npm install && npm run dev`.
5. Visit http://localhost:5173. Register a student, or log in as the seeded admin (`ADMIN_EMAIL` / `ADMIN_PASSWORD`).
6. Optionally copy `client/.env.example` to `client/.env` to change the API URL.

## Features
- Student registration/login, protected admin pages
- Link handles, LeetCode GraphQL sync, self-reported CodeChef/HackerRank counts
- Dashboard and coding difficulty chart
- Eligibility checks for solved count, CGPA, branch and deadline
- Apply once, view status, admin CRUD jobs and shortlist applicants
- Seed sample jobs, daily 2 AM server-local LeetCode refresh

## Notes
- A MongoDB database is **required**; the project does not embed a database.
- LeetCode GraphQL is unofficial and can be rate-limited or change. Failed lookups display errors; existing counts remain unchanged.
- CodeChef/HackerRank counts are **unverified manual inputs**. This is a demonstration, not a tamper-resistant production placement ranking. Verification should be added before official use.
- `JWT_SECRET` and admin password must be changed. For production, prefer secure httpOnly cookies and additional controls against fraudulent count submissions.
- Cron runs in the server's local timezone; on hosts that sleep, scheduled refresh is not guaranteed.

## Tests
`cd server && npm test`

## Deployment
- MongoDB Atlas: create a cluster and database user; set `MONGO_URI` on the backend.
- Render: deploy `server`, build `npm install`, start `npm start`; set `JWT_SECRET`, `MONGO_URI`, `CLIENT_URL`, and `PORT` (or use assigned port).
- Vercel: deploy `client` with Vite preset; set `VITE_API_URL=https://YOUR-BACKEND/api`; configure SPA rewrite to `/index.html` if needed.
- For a deployed demo, seed admin by running `npm run seed` with production environment variables securely.
