import axios from 'axios'
import qs from 'qs'
import { Toast } from 'vant'
import { createStore } from 'vuex'
export const config =  {
  baseUrl:
    process.env.NODE_ENV === "development" ? "http://ebasetest2.ciih.net" : "/",
};

axios.defaults.withCredentials = true // 是否允许跨域
axios.defaults.timeout = 15000
axios.defaults.baseURL = config.baseUrl
//axios.defaults.validateStatus = () => true

//默认options
const DEFAULT_OPTION = {
  responseType: 'json', //类型
  url: '/', //url
  data: {}, //请求参数再此
  method: 'POST',
  msgKey: 'msg',
  codeKey: 'code',
  dataKey: 'data',

  appMsgKey: 'text',
  appDataKey: 'data',

  successCode: '1',
  notLoginCode: '-14',
  returnInvalidResponse: false, //返回错误结果
  showSuccessMessage: false, //成功/失败提示
  showErrorMessage: true, //成功/失败提示
  silent: false, //不显示loading
  resumeOnError: false, //false时失败直接抛出异常
  transformRequest: [
    function (data) {
      return qs.stringify(data)
    },
  ],
}

function notifyUserWithAlert(message, title = '网络请求失败') {
  Toast.fail({
    message: message,
  })
}

export const loadingState = createStore(
  {
    state() {
      return {
        loading: 0,
      }
    },
    mutations: {
      loading(state,count){
        state.loading += Number(count)
      },
      startLoading(state) {
        state.loading++
      },
      stopLoading(state) {
        state.loading--
      },
    },
  },
)

export const request = {
  //api列表
  //post请求,resumeOnError为false时,失败将会抛出异常,request的异常信息,或者data[option.msgKey]
  post: async function (option) {
    const defaultOption = {
      method: 'POST',
      header: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    }
    option = Object.assign({}, DEFAULT_OPTION, defaultOption, option)
    return await this.request(option)
  },

  upload: async function (options) {
    const defaultOption = {
      method: 'POST',
      transformRequest: [],
      header: {
        'Content-Type': 'multipart/form-data',
      },
      timeout: 60_000,
    }
    options = Object.assign({}, DEFAULT_OPTION, defaultOption, options)
    return await this.request(options)
  },

  get: async function (option) {
    const defaultOption = {
      method: 'get',
      transformRequest: [],
      header: {},
    }
    option = Object.assign({}, DEFAULT_OPTION, defaultOption)
    return await this.request(option)
  },

  request: async function (option) {
    const axiosInstance = axios.create()
    this.interceptors(axiosInstance, option)
    try {
      if (!option.silent) {
        loadingState.commit('loading', 1)
      }
      // option.header[config.authorizationKey] =
      //   option.token || getAppToken() || "";
      const res = await axiosInstance.request({
        url: option.url,
        data: option.data,
        method: option.method,
        transformRequest: option.transformRequest,
        responseType: option.responseType,
        headers: option.header,
        timeout: option.timeout,
      })
      if (res.data.token) {
        //setAppToken(res.data.token);
      }
      if (option.showSuccessMessage) {
        Toast.success({
          message: res.data.msg,
        })
      }
      return res.data.data
    } catch (err) {
      if (!option.resumeOnError) {
        throw err
      }
    } finally {
      if (!option.silent) {
        loadingState.commit("loading", -1);
      }
    }
  },

  interceptors(instance, option) {
    // 请求拦截
    instance.interceptors.request.use(
      (config) => {
        return config
      },
      (error) => {
        return Promise.reject(error)
      },
    )
    // 响应拦截
    instance.interceptors.response.use(
      async (axiosResponse) => {
        return new Promise((resolve, reject) => {
          if (axiosResponse.status === 200) {
            //在此处进行响应拦截
            if (this.isValidResponse(axiosResponse)) {
              resolve(axiosResponse)
            } else {
              notifyUserWithAlert(
                this.axiosResponseErrorMessageCreator(axiosResponse),
                '操作失败',
              )
              if (option.returnInvalidResponse) {
                resolve(axiosResponse)
              } else {
                reject(axiosResponse)
              }
            }
          } else {
            notifyUserWithAlert(
              `ERROR:${axiosResponse.status} ${JSON.stringify(
                axiosResponse.statusText,
              )}`,
            )
            reject(axiosResponse)
          }
        })
      },
      (error) => {
        notifyUserWithAlert(
          `REJECT: ${error.message || JSON.stringify(error)}`,
        )
        return Promise.reject(error)
      },
    )
  },

  //下面两个方法根据后端返回值确定
  /**
   * 决定axiosResponse是否是有效的返回值
   * @param axiosResponse
   * @returns {boolean}
   */
  isValidResponse: function (axiosResponse) {
    try {
      return (
        String(axiosResponse.data.code) === '1' ||
        String(axiosResponse.data.status) === '1'
      )
    } catch (e) {
      return false
    }
  },

  /**
   * 未授权
   * @param axiosResponse
   * @returns {boolean}
   */
  isUnauthorizedResponse: function (axiosResponse) {
    try {
      return String(axiosResponse.data.code) === '401'
    } catch (e) {
      return false
    }
  },

  /**
   * 当axiosResponse判定为无效时,创建errorMessage
   * @param axiosResponse
   * @returns {string}
   */
  axiosResponseErrorMessageCreator: function (axiosResponse) {
    return axiosResponse.data.msg || axiosResponse.data.text || '无效的返回值'
  },
}
