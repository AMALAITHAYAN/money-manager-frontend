import api from "./axios";

/**
 * period: WEEK | MONTH | YEAR
 * optional: division=PERSONAL|OFFICE, start/end (ISO Instants)
 */
export const analyticsApi = {
  dashboard: (params) => api.get("/api/analytics/dashboard", { params }).then(r => r.data),
};
