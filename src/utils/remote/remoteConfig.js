import remote from "@/utils/remote/remote";
import { notification } from "@/utils/notification/notify";
import { getToken } from "@/utils/storage/storage";
import { startLoading, stopLoading } from "@/utils/remote/store";
import { cacheNetworkData, retrieveNetworkData } from "@/utils/cache/L3Cache";

remote.init({
  onCacheRetrieve(option) {
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
            notification.success(
              axiosResponse.data.msg || axiosResponse.data.text || "操作成功"
            );
          }
          cacheNetworkData(option, axiosResponse.data);
          resolve(axiosResponse.data);
        } else {
          notification.error(axiosResponse.data.msg || axiosResponse.data.text);
          reject(axiosResponse);
        }
      } else {
        notification.error(axiosResponse.statusText);
        reject(axiosResponse);
      }
    });
  },

  onInterceptRejectedRequest(error, option) {
    if (option.showErrorMessage && error) {
      notification.error(error.message || String(error));
    }
    return error;
  },
  onInterceptRejectedResponse(error, option) {
    if (option.showErrorMessage && error) {
      notification.error(error.message || String(error));
    }
    return error;
  },

  startLoading(option) {
    startLoading(option.tag, option.taskName, option.cancelSource);
  },
  stopLoading(option) {
    stopLoading(option.tag, option.taskName, option.cancelSource);
  },
});
