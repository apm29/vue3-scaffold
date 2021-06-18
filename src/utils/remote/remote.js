import axios from "axios";
import qs from "qs";

axios.defaults.withCredentials = true; // 是否允许跨域
axios.defaults.timeout = 10000;
axios.defaults.baseURL =
  process.env.VUE_APP_BASE_URL + process.env.VUE_APP_BASE_PATH;
//默认options

const DEFAULT_OPTION = {
  responseType: "json", //类型
  url: "/", //url
  data: {}, //请求参数在此
  method: "POST",
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
  },
  authorizationKey: "Authorization",
  transformRequest: [
    (data) => {
      return qs.stringify(data, { arrayFormat: "indices", allowDots: true });
    },
  ],
  fileName: undefined,
  showSuccessMessage: true,
};

/**
 * 请求工具类
 */
export default {
  postFormData: async function (option) {
    const postOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    };
    option = Object.assign({}, DEFAULT_OPTION, postOptions, option);
    return await this.request(option);
  },

  postJson: async function (option) {
    const postOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      transformRequest: [
        (data) => {
          return JSON.stringify(data);
        },
      ],
    };
    option = Object.assign({}, DEFAULT_OPTION, postOptions, option);
    return await this.request(option);
  },

  upload: async function (option) {
    const uploadOptions = {
      method: "POST",
      transformRequest: [],
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    option = Object.assign({}, DEFAULT_OPTION, uploadOptions, option);
    return await this.request(option);
  },

  get: async function (option) {
    const getOptions = {
      method: "GET",
      headers: {},
    };
    option = Object.assign({}, DEFAULT_OPTION, getOptions, option);
    return await this.request(option);
  },
  request: async function (option) {
    const axiosInstance = axios.create();
    this.interceptors(axiosInstance, option);
    try {
      Utils.startLoading(option);
      return await axiosInstance.request({
        ...option,
      });
    } finally {
      Utils.stopLoading(option);
    }
  },

  interceptors(instance, option) {
    // 请求拦截
    instance.interceptors.request.use(
      async (config) => {
        return Utils.onInterceptRequest(config, option);
      },
      (error) => {
        return Promise.reject(error);
      }
    );
    // 响应拦截
    instance.interceptors.response.use(
      async (axiosResponse) => {
        return Utils.onInterceptResponse(axiosResponse, option);
      },
      (error) => {
        return Promise.reject(error);
      }
    );
  },

  init({ onInterceptRequest, onInterceptResponse, startLoading, stopLoading }) {
    Utils.onInterceptResponse =
      onInterceptResponse || Utils.onInterceptResponse;
    Utils.onInterceptRequest = onInterceptRequest || Utils.onInterceptRequest;
    Utils.startLoading = startLoading || Utils.startLoading;
    Utils.stopLoading = stopLoading || Utils.stopLoading;
  },
};

const Utils = {
  startLoading(option) {},
  stopLoading(option) {},
  onInterceptRequest(axiosRequestConfig, option) {
    return axiosRequestConfig;
  },
  onInterceptResponse(axiosRequestConfig, option) {
    return axiosRequestConfig;
  },
};
