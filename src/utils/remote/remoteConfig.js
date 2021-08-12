import remote from "@/utils/remote/remote";
import { Notify } from "vant";
import { getToken } from "@/utils/storage/storage";
import { startLoading, stopLoading } from "@/utils/remote/store";
import { cacheNetworkData, retrieveNetworkData } from "@/utils/cache/L3Cache";
import axios from "axios";

remote.init({
  onCacheRetrieve(option) {
    if (option.invalidateCache) {
      return null;
    }
    return retrieveNetworkData(option);
  },

  onInterceptRequest(axiosRequest, option) {
    axiosRequest.headers.Authorization = option.token || getToken();
    return axiosRequest;
  },
  onInterceptResponse(axiosResponse, option) {
    return new Promise((resolve, reject) => {
      if (axiosResponse.status === 200) {
        //在此处进行响应拦截
        if (
          String(axiosResponse.data.status) === "1" ||
          String(axiosResponse.data.code) === "1"
        ) {
          if (option.showSuccessMessage) {
            Notify({
              msg:
                axiosResponse.data.msg || axiosResponse.data.text || "操作成功",
              type: "success",
            });
          }
          cacheNetworkData(option, axiosResponse.data, option.expire);
          resolve(axiosResponse.data);
        } else {
          Notify({
            type: "danger",
            message: axiosResponse.data.msg || axiosResponse.data.text,
          });
          reject(axiosResponse);
        }
      } else {
        Notify({
          type: "danger",
          message: axiosResponse.statusText,
        });
        reject(axiosResponse);
      }
    });
  },

  onInterceptRejectedRequest(error, option) {
    if (option.showErrorMessage && error) {
      Notify({
        type: "danger",
        message: error.message || String(error),
      });
    }
    return error;
  },
  onInterceptRejectedResponse(error, option) {
    if (option.showErrorMessage && error) {
      Notify({
        type: "danger",
        message: error.message || String(error),
      });
    }
    return error;
  },

  startLoading(option) {
    if (option.taskName && !option.cancelToken) {
      const tokenSource = new axios.CancelToken.source();
      option.cancelSource = tokenSource;
      option.cancelToken = tokenSource.token;
    }
    startLoading(option.tag, option.taskName, option.cancelSource);
  },
  stopLoading(option) {
    stopLoading(option.tag, option.taskName, option.cancelSource);
  },
});
