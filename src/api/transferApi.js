import api from "./axios";

export const transferApi = {
  create: (payload) => api.post("/transfers", payload).then(r => r.data),
};
