import { reactive } from "vue";
const notify = {
  info: function (message, duration = 2500, group = "tr", data) {
    addNotification(message, "info", duration, group, data);
  },
  error: function (message, duration = 2500, group = "tr", data) {
    addNotification(message, "error", duration, group, data);
  },
  warning: function (message, duration = 2500, group = "tr", data) {
    addNotification(message, "warning", duration, group, data);
  },
  success: function (message, duration = 2500, group = "tr", data) {
    addNotification(message, "success", duration, group, data);
  },
};
export const notification = notify;
export const notifyQueue = reactive([]);

let id = 0;

function uniqueId() {
  return ++id;
}

function addNotification(message, type, duration = 2500, group, data) {
  let notification = {
    message: message,
    type: type,
    duration: duration,
    id: uniqueId(),
    dismiss: dismiss,
    data: data,
    group: group, //tr 右上
  };
  notifyQueue.push(notification);

  function dismiss() {
    let index = notifyQueue.indexOf(notification);
    if (index >= 0) {
      notifyQueue.splice(index, 1);
    }
  }

  setTimeout(dismiss, duration);
}
