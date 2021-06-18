import axios from "axios";
import qs from "qs";

axios.defaults.withCredentials = true; // 是否允许跨域
axios.defaults.timeout = 10000;
axios.defaults.baseURL =
  process.env.VUE_APP_BASE_URL + process.env.VUE_APP_BASE_PATH;
// axios.defaults.validateStatus = () => true;
//默认options

console.warn(axios.defaults.baseURL);

const DEFAULT_OPTION = {
  responseType: "json", //类型
  url: "/", //url
  data: {}, //请求参数在此
  method: "POST",
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
  },
  taskName: undefined,
  authorizationKey: "Authorization",
  silent: false, //不显示loading
  resumeOnError: false, //false时失败直接抛出异常
  returnInvalidResponse: false, //是否返回拦截的请求结果
  intercept: true, //是否拦截的请求
  transformRequest: [
    (data) => {
      return qs.stringify(data, { arrayFormat: "indices", allowDots: true });
    },
  ],
  fileName: undefined,
  refreshToken: true, //是否保存接口返回的token
};

/**
 * 请求工具类,post/get/upload
 * resumeOnError为false时,失败将会抛出异常
 * silent: false时会向store提交loading,App.vue会显示Loading界面
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
      if (!option.silent) {
        Utils.startLoading();
      }
      option.headers[option.authorizationKey] =
        option.token || Utils.getLocalToken();
      let axiosResponse = await axiosInstance.request({
        url: option.url,
        data: option.data,
        params: option.params,
        method: option.method,
        transformRequest: option.transformRequest,
        responseType: option.responseType,
        headers: option.headers,
      });
      if (
        axiosResponse.data &&
        axiosResponse.data.token &&
        option.refreshToken
      ) {
        Utils.onNewToken(axiosResponse.data.token);
      }
      return Utils.getResponse(axiosResponse);
    } catch (err) {
      if (!option.resumeOnError) {
        throw err;
      }
    } finally {
      if (!option.silent) {
        Utils.stopLoading();
      }
    }
  },

  interceptors(instance, option) {
    // 请求拦截
    instance.interceptors.request.use(
      (config) => {
        //在此处为请求添加公共参数
        return config;
      },
      (error) => {
        console.warn(error);
        return Promise.reject(error);
      }
    );
    // 响应拦截
    instance.interceptors.response.use(
      async (axiosResponse) => {
        if (!option.intercept) {
          return axiosResponse;
        }
        return new Promise((resolve, reject) => {
          if (axiosResponse.status === 200) {
            //在此处进行响应拦截
            if (Utils.isValidResponse(axiosResponse)) {
              resolve(axiosResponse);
            } else if (Utils.isUnauthorized(axiosResponse)) {
              Utils.notify("Token过期", "操作失败");
              //Token过期
              Utils.onUnauthorized();
              reject(axiosResponse);
            } else {
              Utils.notify(Utils.createErrorMessage(axiosResponse), "操作失败");
              if (option.returnInvalidResponse) {
                resolve(axiosResponse);
              } else {
                reject(axiosResponse);
              }
            }
          } else {
            Utils.notify(
              `ERROR:${axiosResponse.status} ${JSON.stringify(
                axiosResponse.statusText
              )}`
            );
            reject(axiosResponse);
          }
        });
      },
      (error) => {
        Utils.notify(`REJECT: ${error.message || JSON.stringify(error)}`);
        return Promise.reject(error);
      }
    );
  },

  init({
    isValidResponse,
    isUnauthorizedResponse,
    createErrorMessage,
    notify,
    onUnauthorized,
    getLocalToken,
    startLoading,
    stopLoading,
    onNewToken,
    setupAxios,
  }) {
    Utils.isValidResponse = isValidResponse || Utils.isValidResponse;
    Utils.isUnauthorized = isUnauthorizedResponse || Utils.isUnauthorized;
    Utils.createErrorMessage = createErrorMessage || Utils.createErrorMessage;
    Utils.notify = notify || Utils.notify;
    Utils.getLocalToken = getLocalToken || Utils.getLocalToken;
    Utils.onUnauthorized = onUnauthorized || Utils.onUnauthorized;
    Utils.startLoading = startLoading || Utils.startLoading;
    Utils.stopLoading = stopLoading || Utils.stopLoading;
    Utils.onNewToken = onNewToken || Utils.onNewToken;
    Utils.getResponse = onNewToken || Utils.getResponse;
    setupAxios(axios);
  },
};

//下面两个方法根据后端返回值确定
const Utils = {
  /**
   * 决定axiosResponse是否是有效的返回值
   * @param axiosResponse
   * @returns {boolean}
   */
  isValidResponse: function (axiosResponse) {
    try {
      return (
        String(axiosResponse.data.code) === "1" ||
        String(axiosResponse.data.status) === "1"
      );
    } catch (e) {
      return false;
    }
  },
  /**
   * 未授权
   * @param axiosResponse
   * @returns {boolean}
   */
  isUnauthorized(axiosResponse) {
    try {
      return String(axiosResponse.data.code) === "401";
    } catch (e) {
      return false;
    }
  },
  /**
   * 当axiosResponse判定为无效时,创建errorMessage
   * @param axiosResponse
   * @returns {string}
   */
  createErrorMessage(axiosResponse) {
    return axiosResponse.data.msg || axiosResponse.data.text || "无效的返回值";
  },
  notify(message, title = "网络请求失败") {},
  onUnauthorized() {
    // store.dispatch("logout");
    // router.replace({ path: commonConfig.LOGIN_PATH });
  },
  getLocalToken() {
    // store.state.user.token
  },
  getResponse(axiosResponse) {
    // store.state.user.token
    return axiosResponse.data;
  },
  startLoading(taskName) {
    //store.commit("startLoading");
  },
  stopLoading(taskName) {
    //store.commit("stopLoading");
  },
  onNewToken(token) {
    //store.commit("setTokenToStore", axiosResponse.data.token);
  },
};
