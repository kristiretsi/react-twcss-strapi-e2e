# MusicLib

A full-stack music library application built with:
- **React + Vite** frontend
- **Redux Toolkit** state management
- **Tailwind CSS** styling
- **Strapi** backend CMS and API
- **Axios** client-side HTTP layer

The repository contains two main apps:
- `musiclib-fe` — frontend application
- `musiclib-be` — Strapi backend application

---
## Project Overview

MusicLib lets users browse artists, albums, tracks, and favorites through a modern React interface while using Strapi as the content API layer.

Key features:
- Artist, album, and track browsing
- Search support via Strapi endpoints
- Favorite albums management tied to authenticated users, both UI and backend respond accordingly
- Content served from a Strapi backend with media support
- Frontend built with React, React Router, Redux Toolkit, and Tailwind CSS

---
## Repository Structure

`musiclib-be/` — Strapi backend
- `config/` — Strapi server, admin, API, and plugin configuration
- `src/api/` — backend REST API controllers, routes, services
- `scripts/` — helper scripts such as database seed

`musiclib-fe/` — React frontend
- `src/api/` — Axios API client
- `src/components/` — UI components
- `src/pages/` — React route pages
- `src/redux/` — Redux slices and async thunks
- `src/hooks/` — custom hooks

---
## Tech Stack

### Frontend
- React
- Vite
- Redux Toolkit
- React Router
- Tailwind CSS
- Axios
- Swiper

### Backend
- Strapi v5
- SQLite (default local database)
- Strapi plugins: `users-permissions`, `cloud`
- `better-sqlite3`

---
## Local Setup

### 1. Backend

```powershell
cd musiclib-be
npm install
```

If you need to seed example data:

```powershell
npm run seed:example
```

Start the backend:

```powershell
npm run develop
```

The Strapi server will run on:

- `http://localhost:1337`

### 2. Frontend

```powershell
cd ../musiclib-fe
npm install
```

Create a local frontend `.env` file if needed:

```text
VITE_API_URL=http://localhost:1337/api
```

Start the frontend:

```powershell
npm run dev
```

The frontend will run on the Vite default port, typically:

- `http://localhost:5173`

---
## Environment Variables

### Frontend
- `VITE_API_URL` — base URL for the backend API, for example `http://localhost:1337/api`
- The frontend `.env` file is located in `musiclib-fe/.env`

### Backend
The backend uses `musiclib-be/.env` for Strapi settings and the Last.fm API key.

Common backend variables:
- `HOST` — server host, default `0.0.0.0`
- `PORT` — server port, default `1337`
- `APP_KEYS` — comma-separated Strapi app keys
- `ADMIN_JWT_SECRET` — admin JWT secret
- `API_TOKEN_SALT` — token salt
- `TRANSFER_TOKEN_SALT` — token salt
- `ENCRYPTION_KEY` — encryption key
- `DATABASE_CLIENT` — database client type, e.g. `sqlite`
- `DATABASE_FILENAME` — local database file, e.g. `.tmp/data.db`
- `LASTFM_API_KEY` — Last.fm API key used by the backend

The public Last.fm API key included in this repo is:

```text
LASTFM_API_KEY=77afb53cee004c9e900289abb41b2cfb
```

The backend configuration is defined in `musiclib-be/config/server.js`.

---
## Recommended Run Order

1. Start the backend: `musiclib-be/npm run develop`
2. Start the frontend: `musiclib-fe/npm run dev`
3. Open the React app in your browser and confirm it connects to the Strapi API 

---
## Notes

- The frontend Axios client uses `import.meta.env.VITE_API_URL` in `musiclib-fe/src/api/axios-api.js`.
- The backend server default port is configured in `musiclib-be/config/server.js` at `1337`.
- If the project requires a custom Strapi `.env` file, add it in `musiclib-be/`.

---
### Improvements

- Because of incomplete Last.fm metadata, Track and artist details pages don't exist. The current backend logic is the same as the album details flow, but Last.fm data availability is inconsistent.
- Image loading can fail when Last.fm does not return valid artwork. This is a Last.fm data issue rather than a project malfunction.
- Registration option.