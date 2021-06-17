import { reactive } from "vue";
const notify = {
  info: function (message, duration = 2500, data) {
    addNotification(message, "info", duration, data);
  },
  error: function (message, duration = 2500, data) {
    addNotification(message, "error", duration, data);
  },
  warning: function (message, duration = 2500, data) {
    addNotification(message, "warning", duration, data);
  },
  success: function (message, duration = 2500, data) {
    addNotification(message, "success", duration, data);
  },
};
export const notification = notify;
export const notifyQueue = reactive([]);

let id = 0;

function uniqueId() {
  return ++id;
}

function addNotification(message, type, duration = 2500, data) {
  let notification = {
    message: message,
    type: type,
    duration: duration,
    id: uniqueId(),
    dismiss: dismiss,
    data: data,
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
