import api from "./axios";

export const transferApi = {
  create: (payload) => api.post("/api/transfers", payload).then(r => r.data),
};
