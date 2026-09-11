// ============================================================================
// Provider dashboard shell — shared by sessions.html and sources.html.
// Loaded as a classic <script> after config.js and variants.js, so the names
// below are globals for the page script that follows.
//
// It owns: the password gate (markup included — pages don't repeat it), the
// dashboard token and the variants it grants, the General / Post-partum view
// chooser + header switcher, and authorised fetches.
//
// A page calls initDashboard({ title, onVariant }) once and is told which view
// to render; it renders into its own markup and calls authFetch() for data.
// Expected in the page: an element #headerSubtitle, and (optionally) an empty
// .view-switcher #viewSwitcher plus any <a data-dashboard-link> nav links.
// ============================================================================

const TOKEN_KEY = 'sessions_dashboard_token';

let activeVariantKey = null;      // the open view; sent as ?variant= on every call
let dashboardTitle = 'Dashboard';
let onVariantChange = () => {};
let authOverlay, passwordCard, viewChooserCard, viewOptions, authPassword, authSubmit, authError;

// ── Small shared helpers ─────────────────────────────────────────────────────

function escHtml(str) {
    return String(str ?? '')
        .replace(/&/g, '&amp;').replace(/</g, '&lt;')
        .replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

/** Short label for a source URL: its file name, else the host. */
function sourceLabel(source) {
    if (!source) return 'Source';
    try {
        const url = new URL(source);
        return url.pathname.split('/').filter(Boolean).pop() || url.hostname.replace(/^www\./, '');
    } catch { return source; }
}

// ── Token ────────────────────────────────────────────────────────────────────

/** The stored token if present and not expired client-side. Format
 *  '<expiry>.<variant,keys>.<signature>' — anything else (e.g. a token from
 *  before variants existed) is discarded so the provider signs in again. */
function getStoredToken() {
    const token = sessionStorage.getItem(TOKEN_KEY);
    if (!token) return null;
    const parts = token.split('.');
    if (parts.length !== 3 || parseInt(parts[0], 10) * 1000 < Date.now()) {
        sessionStorage.removeItem(TOKEN_KEY);
        return null;
    }
    return token;
}

function storeToken(token) { sessionStorage.setItem(TOKEN_KEY, token); }
function clearToken()      { sessionStorage.removeItem(TOKEN_KEY); }

/** Variant keys granted by the stored token (the backend re-checks them). */
function allowedVariantKeys() {
    const token = getStoredToken();
    return token ? token.split('.')[1].split(',').filter(key => getVariant(key)) : [];
}

/** Provider-facing (English) name of a variant. */
function variantLabel(key) { return localized(getVariant(key).label, 'en'); }

/** Authorised fetch to a backend path — adds the Bearer token and the open
 *  variant (?variant=…), which the backend checks against the token. */
async function authFetch(path, opts = {}) {
    const url = new URL(BACKEND_DOMAIN + path);
    url.searchParams.set('variant', activeVariantKey);
    const token = getStoredToken();
    const headers = { 'Content-Type': 'application/json', ...(opts.headers || {}) };
    if (token) headers['Authorization'] = `Bearer ${token}`;
    const resp = await fetch(url, { ...opts, headers });
    if (resp.status === 401) {
        clearToken();
        showAuthOverlay();
        throw new Error('Session expired — please re-authenticate.');
    }
    return resp;
}

// ── Password gate ────────────────────────────────────────────────────────────

function injectAuthOverlay() {
    const overlay = document.createElement('div');
    overlay.className = 'auth-overlay';
    overlay.id = 'authOverlay';
    overlay.innerHTML = `
        <div class="auth-card" id="passwordCard">
            <div class="auth-logo">
                <span class="auth-logo-icon">🔒</span>
                <div>
                    <div class="auth-title">Provider Access</div>
                    <div class="auth-subtitle">HPV Health Assistant — ${escHtml(dashboardTitle)}</div>
                </div>
            </div>
            <p class="auth-subtitle">
                This dashboard is restricted to authorized providers only.
                Enter your access password to continue.
            </p>
            <div class="auth-field">
                <label class="auth-label" for="authPassword">Password</label>
                <input class="auth-input" type="password" id="authPassword"
                       placeholder="Enter access password" autocomplete="current-password">
            </div>
            <div class="auth-error" id="authError"></div>
            <button class="auth-submit" id="authSubmit">Unlock Dashboard</button>
        </div>
        <div class="auth-card" id="viewChooserCard" hidden>
            <div class="auth-logo">
                <span class="auth-logo-icon">🗂️</span>
                <div>
                    <div class="auth-title">Choose conversations</div>
                    <div class="auth-subtitle">You can switch at any time from the header.</div>
                </div>
            </div>
            <div class="view-options" id="viewOptions"></div>
        </div>`;
    document.body.prepend(overlay);

    authOverlay     = overlay;
    passwordCard    = document.getElementById('passwordCard');
    viewChooserCard = document.getElementById('viewChooserCard');
    viewOptions     = document.getElementById('viewOptions');
    authPassword    = document.getElementById('authPassword');
    authSubmit      = document.getElementById('authSubmit');
    authError       = document.getElementById('authError');

    authSubmit.addEventListener('click', submitPassword);
    authPassword.addEventListener('keydown', e => { if (e.key === 'Enter') submitPassword(); });
}

function showAuthOverlay() {
    passwordCard.hidden = false;
    viewChooserCard.hidden = true;
    authOverlay.classList.remove('hidden');
    authPassword.value = '';
    authError.classList.remove('show');
    authError.textContent = '';
    setTimeout(() => authPassword.focus(), 50);
}

function hideAuthOverlay() { authOverlay.classList.add('hidden'); }

async function submitPassword() {
    const pw = authPassword.value;
    if (!pw) return;
    authSubmit.disabled = true;
    authSubmit.textContent = 'Verifying…';
    authError.classList.remove('show');
    try {
        const resp = await fetch(BACKEND_DOMAIN + '/api/sessions/auth', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ password: pw })
        });
        const data = await resp.json();
        if (resp.ok) {
            storeToken(data.token);
            enterDashboard();           // pick a view, then load it
        } else {
            const remaining = data.attempts_remaining != null
                ? ` (${data.attempts_remaining} attempt${data.attempts_remaining !== 1 ? 's' : ''} remaining)`
                : '';
            authError.textContent = (data.error || 'Authentication failed.') + remaining;
            authError.classList.add('show');
            authPassword.value = '';
            authPassword.focus();
        }
    } catch (e) {
        authError.textContent = 'Could not reach server. Please try again.';
        authError.classList.add('show');
    } finally {
        authSubmit.disabled = false;
        authSubmit.textContent = 'Unlock Dashboard';
    }
}

// ── Variant views (general / post-partum) ────────────────────────────────────

/** After authentication: open the view named in the URL if the token allows it,
 *  go straight in when only one view is allowed, otherwise ask. */
function enterDashboard() {
    const allowed = allowedVariantKeys();
    const fromUrl = variantFromUrl();
    renderViewSwitcher(allowed);
    if (fromUrl && allowed.includes(fromUrl.key)) switchVariant(fromUrl.key, { keepDeepLink: true });
    else if (allowed.length === 1) switchVariant(allowed[0]);
    else showViewChooser(allowed);
}

function renderViewSwitcher(allowed) {
    const el = document.getElementById('viewSwitcher');
    if (!el) return;
    el.hidden = allowed.length < 2;
    el.innerHTML = allowed.map(key =>
        `<button type="button" data-variant="${key}" aria-pressed="false">${escHtml(variantLabel(key))}</button>`
    ).join('');
    el.querySelectorAll('button').forEach(btn => btn.addEventListener('click', () => {
        if (btn.dataset.variant !== activeVariantKey) switchVariant(btn.dataset.variant);
    }));
}

function showViewChooser(allowed) {
    viewOptions.innerHTML = allowed.map(key => `
        <button type="button" class="view-option" data-variant="${key}">
            <strong>${escHtml(variantLabel(key))}</strong>
            <span>${escHtml(localized(getVariant(key).description, 'en'))}</span>
        </button>`).join('');
    viewOptions.querySelectorAll('button').forEach(btn =>
        btn.addEventListener('click', () => switchVariant(btn.dataset.variant, { keepDeepLink: true })));
    passwordCard.hidden = true;
    viewChooserCard.hidden = false;
    authOverlay.classList.remove('hidden');
}

/** Open one variant's view. keepDeepLink tells the page it may honour other URL
 *  parameters (e.g. ?sessionId=) — switching views never does. */
function switchVariant(key, { keepDeepLink = false } = {}) {
    activeVariantKey = key;
    hideAuthOverlay();
    const url = new URL(window.location.href);
    url.searchParams.set('variant', key);
    history.replaceState(history.state, '', url);
    document.querySelectorAll('#viewSwitcher button').forEach(btn =>
        btn.setAttribute('aria-pressed', String(btn.dataset.variant === key)));
    const subtitle = document.getElementById('headerSubtitle');
    if (subtitle) subtitle.textContent = `HPV Health Assistant — Provider View · ${variantLabel(key)}`;
    document.title = `${dashboardTitle} · ${variantLabel(key)}`;
    updateDashboardLinks();
    onVariantChange(key, { keepDeepLink });
}

/** Carry the open view (and a local ?backend=) across the dashboard's own links. */
function updateDashboardLinks() {
    const backend = new URLSearchParams(window.location.search).get('backend');
    document.querySelectorAll('a[data-dashboard-link]').forEach(link => {
        const url = new URL(link.getAttribute('href'), window.location.href);
        if (activeVariantKey) url.searchParams.set('variant', activeVariantKey);
        if (backend) url.searchParams.set('backend', backend);
        link.href = url.pathname.split('/').pop() + url.search;
    });
}

/** Boot the shell. title: page name for the tab + password card.
 *  onVariant(key, {keepDeepLink}): load that view's data. */
function initDashboard({ title, onVariant }) {
    dashboardTitle = title || dashboardTitle;
    onVariantChange = onVariant || onVariantChange;
    injectAuthOverlay();
    if (getStoredToken()) enterDashboard();
    else showAuthOverlay();     // stays up until the correct password is entered
}
