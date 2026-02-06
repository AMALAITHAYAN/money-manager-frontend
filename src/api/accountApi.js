import api from "./axios";

export const accountApi = {
  create: (payload) => api.post("/accounts", payload).then(r => r.data),
  list: () => api.get("/accounts").then(r => r.data),
};
