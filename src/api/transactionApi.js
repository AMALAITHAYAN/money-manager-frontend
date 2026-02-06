import api from "./axios";

export const transactionApi = {
  create: (payload) => api.post("/api/transactions", payload).then(r => r.data),
  list: (params) => api.get("/api/transactions", { params }).then(r => r.data),
  getById: (id) => api.get(`/api/transactions/${id}`).then(r => r.data),
  update: (id, payload) => api.put(`/api/transactions/${id}`, payload).then(r => r.data),
  remove: (id) => api.delete(`/api/transactions/${id}`).then(r => r.data),
};
