import api from "./axios";

export const authApi = {

  register: (payload) =>
    api.post("/api/auth/register", payload).then(r => r.data),

  login: (payload) =>
    api.post("/api/auth/login", payload).then(r => r.data),

  me: () =>
    api.get("/api/auth/me").then(r => r.data),

};
