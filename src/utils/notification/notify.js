import { reactive } from "vue";
const notify = {
  info: function (message) {
    addNotification(message, "info");
  },
  error: function (message) {
    addNotification(message, "error");
  },
  warning: function (message) {
    addNotification(message, "warning");
  },
  success: function (message) {
    addNotification(message, "success");
  },
};
export const notification = notify;
export const notifyQueue = reactive([]);

let id = 0;

function uniqueId() {
  return ++id;
}

function addNotification(message, type, duration = 2500) {
  let notification = {
    message: message,
    type: type,
    duration: duration,
    id: uniqueId(),
    dismiss: dismiss,
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
