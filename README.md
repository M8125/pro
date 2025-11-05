# SeaCities — add MERN auth

This repository is a static site (HTML/CSS/JS). I added a minimal Express + Mongoose backend and client wiring to provide simple signup/login (MERN-style).

What I added
- `server.js` — Express server that serves the static files and mounts `/api/auth`.
- `routes/auth.js` — signup/login endpoints using Mongoose, bcrypt and JWT.
- `models/User.js` — Mongoose User model.
- `auth.js` — client-side script that posts the existing login/signup forms to the new API.
- `package.json` — declares dependencies and scripts.
- `.env.example` — example environment variables for MongoDB and JWT.

Quick start

1. Copy `.env.example` to `.env` and edit values (set `MONGODB_URI` and `JWT_SECRET`). For local MongoDB use `mongodb://localhost:27017/seacities`.

2. Install dependencies:

```powershell
cd "c:\Users\MANU\OneDrive\Desktop\mern\Seacities-main"
npm install
```

3. Start the server:

```powershell
npm start
# or for development with auto-reload (requires nodemon):
npm run dev
```

4. Open http://localhost:8000 in your browser. The signup and login forms will call `/api/auth/signup` and `/api/auth/login`. On success a JWT is stored in `localStorage` and the user is redirected to `home.html`.

Notes and next steps
- This is a minimal scaffold. For production you should:
  - Use a proper session/cookie setup or secure storage for tokens.
  - Add input validation and rate limiting.
  - Use HTTPS and secure JWT secrets.
  - Add protected API routes and user profile pages.

If you want, I can:
- Add protected API endpoints (e.g., user profile),
- Wire `home.html` to show logged-in state using JWT,
- Add basic registration validation and password rules.
