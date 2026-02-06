import api from "./axios";

export const accountApi = {
  create: (payload) => api.post("/api//accounts", payload).then(r => r.data),
  list: () => api.get("/api//accounts").then(r => r.data),
};
