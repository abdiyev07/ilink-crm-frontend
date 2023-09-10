import request from "@/api/request";

export default {
  getList: (query: any) => request.get("orders", { params: query }),
  add: (payload: any) => request.post("orders", payload),
  update: (id: number, payload: any) => request.put(`orders/${id}`, payload),
  delete: (id: string) => request.delete(`orders/${id}`),
};
