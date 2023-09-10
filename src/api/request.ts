import axios from "axios";
import apiConfig from "@/config/api.config";
import store from "@/store";
import router from "@/router";

const instance = axios.create({
  baseURL: `${apiConfig.apiUrl}/${apiConfig.apiVersion}`,
  headers: {
    Accept: "application/json",
  },
});

instance.interceptors.request.use(
  (config: any) => {
    const authToken = store.state.token;
    if (authToken) {
      config.headers.Authorization = "Bearer " + authToken;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => response,
  async function (error) {
    const {
      status,
      data: { message },
    } = error.response;
    const UNAUTHORIZED_STATUS_CODE = 401;
    const INTERNAL_SERVER_ERROR = 500;
    if (status === INTERNAL_SERVER_ERROR) {
      alert("Упс, что-то пошло не так.. Обратитесь в тех поддержку");
    } else if (
      (message && typeof message === "string") ||
      Array.isArray(message)
    ) {
      alert(Array.isArray(message) ? message[0] : message);
    } else if (message && message.error) {
      alert(message.error);
    }
    if (status === UNAUTHORIZED_STATUS_CODE) {
      await store.dispatch("logout");
      await router.push({ name: "auth.login" });
    }
    return Promise.reject(error);
  }
);

export default instance;
