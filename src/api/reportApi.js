import api from "./axios";

export const reportApi = {
  categorySummary: (params) => api.get("/reports/categories", { params }).then(r => r.data),
  exportCsv: async (params) => {
    const res = await api.get("/reports/export", { params, responseType: "blob" });
    return res.data;
  },
};
