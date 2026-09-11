---
name: hpv-frontend
description: Map of the HPV Chat Assistant frontend (index.html patient chat, sessions.html + sources.html provider dashboards, shared variants.js/config.js/dashboard.js) — where things live, how general vs post-partum variants work, session/security rules, and how to test locally. Use before editing any file in usc-hpv-chat-assistant/.
---

# HPV Chat Assistant — frontend

Static site, no build step. Deployed to GitHub Pages (`kartik2112.github.io`) and `sackend.isi.edu`.
**Deploy every file together** — the pages load the shared scripts/stylesheet by relative path.

| File | What it is |
|---|---|
| `index.html` | Patient chat: HTML + CSS + JS in one file (~4.3k lines) |
| `sessions.html` | Provider dashboard: saved conversations (~1.5k lines) |
| `sources.html` | Provider dashboard: the web pages / PDFs actually in the variant's Chroma collection, read live from Chroma per load (read-only) |
| `variants.js` | **Variant registry**: labels, UI overrides, starter questions + follow-ups (en/es) for `general` and `postpartum` |
| `config.js` | `BACKEND_DOMAIN` (sackend vs Render; `?backend=` override accepted **only for localhost**) |
| `dashboard.js` / `dashboard.css` | Shell shared by both dashboard pages: password gate (markup injected), token + its variant scope, view chooser / switcher, `authFetch`, `escHtml`, `sourceLabel`; and the shared styles |

Don't read the big HTML files top to bottom — grep for these anchors instead.

## index.html anchors (grep these)
- `translations = {` — all en/es UI strings. The variant `ui` overrides are merged in by `uiText()`.
- `activeVariant`, `variantLockedByUrl` — the current variant (null until chosen).
- `refreshVariantUi()` / `renderVariantChooser()` — header, empty state, chooser and starter pills for the language + variant.
- `showStarterPills()` / `showSuggestionPills()` / `handleSuggestionClick()` — the pill UI. Canned answers are rendered as Markdown.
- `initSession()` → `/api/session/start` (sends `variant`). `addEvent()` → `/api/session/log`. `endSession()` → `/api/session/end`.
- `callChatOpenAI()` → `/api/chat` SSE (sends `session_id` + `variant`).
- `sendActivityHeartbeat`, `endSessionViaBeacon`, `visibilitychange` — the inactivity / tab-close mechanics.
- `PRE-CHAT QUESTIONNAIRE` — `?qk1..qk6&qm1..qm6` survey params.
- `FEATURE TOUR`, `Step 1: feedback`, `Step 2: hand off` — onboarding and the end-of-conversation modals.

## Variants (general vs post-partum)
- Link: `index.html?variant=general` or `?variant=postpartum`. With no or an invalid value, the disclaimer screen shows a chooser, and "I Understand and Agree" stays disabled until something is picked.
- The chooser is hidden while a conversation is in progress (the header language toggle re-shows the disclaimer). A variant can only change **between** sessions, because the backend binds it at `/api/session/start`.
- The dashboard has one view per variant: the password → a "Choose conversations" card → a header switcher. `authFetch()` adds `?variant=` to every call. The token looks like `<expiry>.<variant,keys>.<sig>`, and `allowedVariantKeys()` reads the scope from it.
- **Adding a dashboard page:** include `config.js`, `variants.js`, `dashboard.js` + `dashboard.css`, give the page a `#headerSubtitle`, an empty `.view-switcher#viewSwitcher`, `<a data-dashboard-link>` nav links, then call `initDashboard({ title, onVariant })` and load data with `authFetch(path)`. `sources.html` is the smallest example.
- **Adding a variant:** add an entry to `HPV_VARIANTS` in `variants.js` (key, label, description, `ui` overrides, starterQuestions with en+es), **and** the same key to the backend's `variants.py`. Nothing else in the HTML needs to change.

## Security rules
- The patient page can only create a session, append to **its own** session (the UUID acts as the capability), and end it. It never chooses a folder, only a variant key that the backend checks against its allowlist.
- Dashboard calls need the Bearer token. The backend re-checks the variant against the token's signed scope, and editing the token client-side invalidates the signature.
- Never widen `config.js` overrides beyond localhost: a crafted link could send the dashboard password to another server.
- Render user and LLM text with `escapeHtml` / `escHtml`, or with `marked` for assistant Markdown.

## Local testing
```bash
python3 -m http.server 8765        # from usc-hpv-chat-assistant/
```
Open `http://localhost:8765/index.html?backend=http://localhost:5055` (and the same for `sessions.html`). The backend must list `http://localhost:8765` in `ALLOWED_ORIGINS`, and its folder structure is described in the backend skill (`hpv-backend`).
