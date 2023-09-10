import request from "@/api/request";

export default {
  login: (payload: any) => request.post("auth/login", payload),
};
