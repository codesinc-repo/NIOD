// Thin fetch wrapper around the Pareshey Organic API.
// Reads VITE_API_BASE_URL from env (default: live API).

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'https://api.paresheyorganic.com';

const TOKEN_KEY = 'niod_auth_token';
const ADMIN_TOKEN_KEY = 'niod_admin_token';
const CART_SESSION_KEY = 'niod_cart_session';

export const tokenStore = {
  get:        () => localStorage.getItem(TOKEN_KEY),
  set:        (t) => localStorage.setItem(TOKEN_KEY, t),
  clear:      () => localStorage.removeItem(TOKEN_KEY),
  getAdmin:   () => localStorage.getItem(ADMIN_TOKEN_KEY),
  setAdmin:   (t) => localStorage.setItem(ADMIN_TOKEN_KEY, t),
  clearAdmin: () => localStorage.removeItem(ADMIN_TOKEN_KEY),
};

export const cartSession = {
  get: () => localStorage.getItem(CART_SESSION_KEY),
  set: (s) => localStorage.setItem(CART_SESSION_KEY, s),
  clear: () => localStorage.removeItem(CART_SESSION_KEY),
};

class ApiError extends Error {
  constructor(status, body) {
    super((body && body.message) || `HTTP ${status}`);
    this.status = status;
    this.body = body;
  }
}

async function request(method, path, { body, auth, admin, cart, headers = {} } = {}) {
  const url = `${API_BASE}${path}`;
  const reqHeaders = { Accept: 'application/json', ...headers };

  if (admin) {
    const t = tokenStore.getAdmin();
    if (t) reqHeaders.Authorization = `Bearer ${t}`;
  } else if (auth) {
    const t = tokenStore.get();
    if (t) reqHeaders.Authorization = `Bearer ${t}`;
  }

  let cartSess = null;
  if (cart) {
    cartSess = cartSession.get();
    if (cartSess) reqHeaders['X-Cart-Session'] = cartSess;
  }

  let payload;
  if (body !== undefined) {
    if (body instanceof FormData) {
      payload = body; // browser sets Content-Type with boundary
    } else {
      reqHeaders['Content-Type'] = 'application/json';
      payload = JSON.stringify(body);
    }
  }

  const res = await fetch(url, { method, headers: reqHeaders, body: payload });

  const ct = res.headers.get('content-type') || '';
  const data = ct.includes('application/json') ? await res.json().catch(() => null) : await res.text();

  if (cart) {
    // Prefer the explicit response header; fall back to a session_id field
    // on the cart payload (in case CORS strips the custom header).
    const newSess =
      res.headers.get('x-cart-session') ||
      (data && typeof data === 'object' && data.session_id) ||
      null;
    if (newSess && newSess !== cartSess) cartSession.set(newSess);
  }

  if (!res.ok) throw new ApiError(res.status, data);
  return data;
}

export const api = {
  get:    (p, o) => request('GET',    p, o),
  post:   (p, body, o) => request('POST',   p, { ...o, body }),
  put:    (p, body, o) => request('PUT',    p, { ...o, body }),
  patch:  (p, body, o) => request('PATCH',  p, { ...o, body }),
  delete: (p, o) => request('DELETE', p, o),
};

export const apiBase = API_BASE;
export { ApiError };
