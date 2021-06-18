import remote from "@/utils/remote/remote";
import { notification } from "@/utils/notification/notify";
import { getToken } from "@/utils/storage/storage";
import { startLoading, stopLoading } from "@/utils/remote/store";

remote.init({
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
          resolve(axiosResponse);
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
  startLoading(option) {
    startLoading(option.tag, option.taskName, option.cancelSource);
  },
  stopLoading(option) {
    stopLoading(option.tag, option.taskName, option.cancelSource);
  },
});
