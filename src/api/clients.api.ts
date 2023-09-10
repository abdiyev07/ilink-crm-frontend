import request from "@/api/request";

export default {
  getList: (query: any) => request.get("potential-clients", { params: query }),
  add: (payload: any) => request.post("potential-clients", payload),
  update: (id: number, payload: any) =>
    request.put(`potential-clients/${id}`, payload),
  delete: (id: string) => request.delete(`potential-clients/${id}`),
};
