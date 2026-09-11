// ============================================================================
// Backend base URL — shared by index.html (patient chat) and sessions.html
// (provider dashboard). Loaded as a classic <script>, so BACKEND_DOMAIN is a
// global for the page scripts that follow.
//
//   • page served from sackend.isi.edu   → the sackend backend
//   • anywhere else (GitHub Pages)       → the Render backend
//   • ?backend=http://localhost:PORT     → a local dev backend
//
// Only localhost / 127.0.0.1 overrides are honoured. An arbitrary override
// would let a crafted link send the dashboard password or patient messages to
// someone else's server.
// ============================================================================

const BACKEND_DOMAIN = (() => {
    const override = new URLSearchParams(window.location.search).get('backend');
    if (override) {
        try {
            const url = new URL(override);
            if (['localhost', '127.0.0.1'].includes(url.hostname)) return url.origin;
        } catch (e) { /* malformed URL — fall through */ }
        console.warn('Ignoring ?backend= override: only localhost backends are allowed.');
    }
    return window.location.hostname === 'sackend.isi.edu'
        ? 'https://sackend.isi.edu/chathpv/bot/backend'
        : 'https://usc-hpv-chat-assistant-backend.onrender.com';
})();
