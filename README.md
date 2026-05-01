# pip

A kind-by-design language-learning app. No streaks, no leagues, no shame — words known, minutes spent. Free, the whole way; stories are the only paid part.

Prerelease. Things will change. Your data may be reset.

## What's in here

- **Mobile app** (Expo / React Native, TypeScript) — at the repo root
- **Server** (Bun + Elysia + Drizzle + better-auth) — under `server/`
- **Postgres** for sessions and progress sync — via `docker-compose.yml`
- **Content** (languages, curricula, stories) — server-side under `server/src/content/`

13 playable languages today (French, Spanish, Italian, German, Portuguese, Dutch, Polish, Russian, Swedish, Norwegian, Greek, Turkish, Indonesian) plus a catalog of ~20 more marked "coming soon". Each playable course currently has one A1 unit ("Hello, world") with four lessons — Greetings, Numbers 1–10, Family, Food & drink — and five-exercise lessons that mix translate-tap, multiple-choice, listen-and-select, and match-pairs.

## Stack

```
mobile      Expo SDK 55 · RN 0.83 · React 19 · expo-speech for TTS
            expo-secure-store for token + prefs
server      Bun 1.3 · Elysia · Drizzle ORM · postgres.js · better-auth
db          Postgres 16 (docker-compose locally; Railway plugin in prod)
build       EAS for Android APKs · Xcode + prebuild for iOS dev
```

## Project layout

```
.
├── App.tsx, src/, app.json, ios/      ← mobile app
├── server/                            ← Bun + Elysia API
│   ├── src/
│   │   ├── index.ts                   ← Elysia app
│   │   ├── auth.ts                    ← better-auth config
│   │   ├── routes/                    ← /api/me/* and /api/content/*
│   │   ├── content/
│   │   │   ├── languages.ts           ← LANGUAGES catalog
│   │   │   ├── curricula/             ← per-language phrase data
│   │   │   └── stories.ts             ← per-language stories
│   │   └── db/                        ← drizzle schema, client, migrate
│   └── drizzle/                       ← generated migrations (committed)
├── docker-compose.yml                 ← postgres + adminer for dev
├── Dockerfile                         ← server image (Railway uses this)
├── railway.toml                       ← Railway service config
└── eas.json                           ← Android/iOS build profiles
```

## Quick start — local

You'll need: Node + `pnpm`, Bun, Docker, an iOS simulator (Xcode).

### 1. Bring up Postgres

```bash
docker compose up -d
```

This boots Postgres on `localhost:54327` and Adminer on `localhost:18102` (login: `pip` / `pip_dev_password` / db `pip` / server `postgres`).

### 2. Configure the server

```bash
cd server
cp .env.example .env
# generate a secret if .env.example still has the placeholder
echo "BETTER_AUTH_SECRET=$(openssl rand -base64 32)" >> .env
bun install
bun run dev
```

Server listens on `http://localhost:39443`. Migrations run automatically on boot.

### 3. Run the mobile app

In another terminal:

```bash
pnpm install
pnpm ios
```

First build is slow (Pods compile). Hot reload after that. The app boots into onboarding the first time; sign up with any email + 8-char password.

## Running on a real device (your laptop's LAN)

iOS simulator and Android emulator can both reach `localhost`. A real phone needs your laptop's LAN IP.

### 1. Find your IP

```bash
ipconfig getifaddr en0          # macOS
hostname -I | awk '{print $1}'  # linux
```

### 2. Tell the server to trust it

In `server/.env`, add the LAN URL to `TRUSTED_ORIGINS`:

```
TRUSTED_ORIGINS=http://localhost:8081,exp://localhost:8081,http://localhost:39443,http://192.168.X.Y:39443,pip://app
```

Restart the server.

### 3. Tell the build to point at it

`eas.json` has a `preview` profile that bakes `EXPO_PUBLIC_API_URL` into the bundle. Edit it to match your LAN IP, then:

```bash
pnpm dlx eas-cli build --platform android --profile preview --clear-cache
```

EAS prints a download link; install the APK from there. The phone has to be on the same WiFi as your laptop, with no VPN and no AP isolation.

> Caveat: HTTP over LAN works on Android because we set `usesCleartextTraffic: true`. For shipping to anyone outside your house, deploy the server (see below) and switch the build to a profile that points at the public HTTPS URL.

## Deploying the server (Railway)

`Dockerfile` and `railway.toml` are pre-wired. From scratch:

1. **Create a new project** in Railway from the GitHub repo. It'll detect the Dockerfile.
2. **Add Postgres** to the project: `+ New → Database → Postgres`. Railway auto-injects `DATABASE_URL` into your service.
3. **Set service variables**:
   ```
   BETTER_AUTH_SECRET=<openssl rand -base64 32>
   BETTER_AUTH_URL=https://<your-service>.up.railway.app
   TRUSTED_ORIGINS=https://<your-service>.up.railway.app,pip://app
   ```
4. **Deploy.** Auto-migrations run on first boot. Watch the logs for `pip-server listening on http://localhost:<port>`.
5. **Point the mobile app at it.** Edit `eas.json`'s `production` profile:
   ```json
   "env": { "EXPO_PUBLIC_API_URL": "https://<your-service>.up.railway.app" }
   ```
   Build with `--profile production` for an APK that doesn't depend on your laptop being awake.

## Adding a new language

Adding a 14th playable language is one new file plus one line:

```bash
# server/src/content/curricula/sw-KE.ts
export const swahili: LanguageContent = {
  prefix: 'sw',
  source: 'en-US',
  target: 'sw-KE',
  unitName: 'Hello, world',
  greetings: [ ... 5 sentences ... ],
  numbers:   [ ... 10 pairs ... ],
  family:    [ ... 6 pairs ... ],
  food:      [ ... 6 pairs ... ],
};
```

```ts
// server/src/content/curricula/index.ts
import { swahili } from './sw-KE.ts';
ALL_CURRICULA.push(buildCurriculum(swahili));
```

If `sw-KE` isn't in the catalog yet, also add an entry to `server/src/content/languages.ts`. Restart the server (`bun --watch` does it automatically) and the mobile app picks it up on next sign-in or app boot — no rebuild required.

## Useful commands

```bash
# Mobile
pnpm ios                              # build & run on iOS simulator
pnpm exec expo prebuild --clean       # regenerate ios/ from app.json
pnpm tsc                              # type-check

# Server
cd server
bun run dev                           # watch mode on :39443
bun run db:generate                   # generate a new migration from schema.ts
bun run db:migrate                    # apply pending migrations
bun run db:studio                     # open Drizzle Studio against the DB
bun run tsc                           # type-check

# DB (with docker-compose up)
docker exec -it pip-postgres psql -U pip -d pip
open http://localhost:18102           # Adminer

# EAS builds
pnpm dlx eas-cli build --platform android --profile preview
pnpm dlx eas-cli build --platform android --profile preview --clear-cache
```

## License

Not yet decided. Treat as proprietary until then.
