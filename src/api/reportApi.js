import api from "./axios";

export const reportApi = {
  categorySummary: (params) => api.get("/api/reports/categories", { params }).then(r => r.data),
  exportCsv: async (params) => {
    const res = await api.get("/api/reports/export", { params, responseType: "blob" });
    return res.data;
  },
};
