import api from "./axios";

export const budgetApi = {
  upsert: (payload) => api.post("/budgets", payload).then(r => r.data),
  list: (params) => api.get("/budgets", { params }).then(r => r.data),
  status: (params) => api.get("/budgets/status", { params }).then(r => r.data),
};
