import api from "./axios";

export const budgetApi = {
  upsert: (payload) => api.post("/api/budgets", payload).then(r => r.data),
  list: (params) => api.get("/api/budgets", { params }).then(r => r.data),
  status: (params) => api.get("/api/budgets/status", { params }).then(r => r.data),
};
