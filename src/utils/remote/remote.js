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
  showErrorMessage: true,
  tag: "app", //loading指示器的tag(分组)
  taskName: "请求", //loading指示器的名称
  cancelSource: undefined,
  cancelToken: undefined,
  onInterceptRequest: undefined, //Function 拦截请求
  onInterceptResponse: undefined, //Function 拦截响应
  onInterceptRejectedRequest: undefined, //Function 拦截rejected请求
  onInterceptRejectedResponse: undefined, //Function 拦截rejected响应
  startLoading: undefined, //Function 开始加载
  stopLoading: undefined, //Function 结束加载
};

/**
 * 请求工具类
 */
export default {
  post: async function (option) {
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
      //首先使用option中的loading拦截
      if (option.startLoading && option.startLoading instanceof Function) {
        option.startLoading(option);
      } else {
        Utils.startLoading(option);
      }
      return await axiosInstance.request({
        ...option,
      });
    } finally {
      //首先使用option中的loading拦截
      if (option.stopLoading && option.stopLoading instanceof Function) {
        option.stopLoading(option);
      } else {
        Utils.stopLoading(option);
      }
    }
  },

  interceptors(instance, option) {
    // 请求拦截
    instance.interceptors.request.use(
      async (config) => {
        //首先使用option中的请求拦截
        if (
          option.onInterceptRequest &&
          option.onInterceptRequest instanceof Function
        ) {
          return option.onInterceptRequest(option);
        }
        return Utils.onInterceptRequest(config, option);
      },
      (error) => {
        let tryGetError =
          option.onInterceptRejectedRequest &&
          option.onInterceptRejectedRequest(error, option);
        return Promise.reject(
          tryGetError || Utils.onInterceptRejectedResponse(error, option)
        );
      }
    );
    // 响应拦截
    instance.interceptors.response.use(
      async (axiosResponse) => {
        //首先使用option中的响应拦截
        if (
          option.onInterceptResponse &&
          option.onInterceptResponse instanceof Function
        ) {
          return option.onInterceptResponse(option);
        }
        return Utils.onInterceptResponse(axiosResponse, option);
      },
      (error) => {
        let tryGetError =
          option.onInterceptRejectedResponse &&
          option.onInterceptRejectedResponse(error, option);
        return Promise.reject(
          tryGetError || Utils.onInterceptRejectedResponse(error, option)
        );
      }
    );
  },

  init({
    onInterceptRequest,
    onInterceptResponse,
    onInterceptRejectedRequest,
    onInterceptRejectedResponse,
    startLoading,
    stopLoading,
  }) {
    Utils.onInterceptResponse =
      onInterceptResponse || Utils.onInterceptResponse;
    Utils.onInterceptRequest = onInterceptRequest || Utils.onInterceptRequest;
    Utils.startLoading = startLoading || Utils.startLoading;
    Utils.stopLoading = stopLoading || Utils.stopLoading;
    Utils.onInterceptRejectedRequest =
      onInterceptRejectedRequest || Utils.onInterceptRejectedRequest;
    Utils.onInterceptRejectedResponse =
      onInterceptRejectedResponse || Utils.onInterceptRejectedResponse;
  },
};

const Utils = {
  startLoading(option) {},
  stopLoading(option) {},
  onInterceptRequest(axiosRequestConfig, option) {
    return axiosRequestConfig;
  },
  onInterceptRejectedRequest(error, option) {
    return error;
  },
  onInterceptResponse(axiosRequestConfig, option) {
    return axiosRequestConfig;
  },
  onInterceptRejectedResponse(error, option) {
    return error;
  },
};
