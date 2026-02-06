export const authStore = {
  getToken() { return localStorage.getItem("token"); },
  setSession(token, user) {
    localStorage.setItem("token", token);
    if (user) localStorage.setItem("user", JSON.stringify(user));
  },
  clear() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  },
  getUser() {
    const raw = localStorage.getItem("user");
    try { return raw ? JSON.parse(raw) : null; } catch { return null; }
  }
};
