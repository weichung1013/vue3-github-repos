import axios from "axios";

let service = null;
export const setConfig = async () => {
  const baseUrl = import.meta.env.VITE_APP_URL_REST_API;
  try {
    const NewConfig = {
      baseURL: baseUrl,
      headers: {
        Accept: "application/vnd.github+json",
      },
      timeout: 1000000,
      responseType: "json",
    };
    return NewConfig;
  } catch (error) {
    console.log(error);
  }
};

export const Service = async () => {
  if (service === null) {
    const Config = await setConfig();
    const newService = axios.create({
      baseURL: Config.baseURL,
      timeout: Config.timeout,
      headers: Config.headers,
      responseType: Config.responseType,
      validateStatus: function (status) {
        return (status >= 200 && status < 300) || status == 401; // default
      },
    });
    newService.interceptors.response.use(
      async (res) => {
        if (res.status === 200) {
          if (res.data == null) {
            return true;
          }
          return Promise.resolve(res.data);
        } else if (res.status === 401) {
          console.log("%c Access Denied!", "color:orange;font-weight:bold");
        } else {
          return Promise.reject(res.message);
        }
      },
      async (error) => {
        return Promise.reject(error.response.data);
      }
    );
    service = newService;
    return newService;
  } else {
    return service;
  }
};
