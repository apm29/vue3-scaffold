import { reactive } from "vue";
const notify = {
  info: function (
    message,
    duration = 2500,
    group = "tr",
    data,
    onNotificationClick
  ) {
    addNotification(
      message,
      "info",
      duration,
      group,
      data,
      onNotificationClick
    );
  },
  error: function (
    message,
    duration = 2500,
    group = "tr",
    data,
    onNotificationClick
  ) {
    addNotification(
      message,
      "error",
      duration,
      group,
      data,
      onNotificationClick
    );
  },
  warning: function (
    message,
    duration = 2500,
    group = "tr",
    data,
    onNotificationClick
  ) {
    addNotification(
      message,
      "warning",
      duration,
      group,
      data,
      onNotificationClick
    );
  },
  success: function (
    message,
    duration = 2500,
    group = "tr",
    data,
    onNotificationClick
  ) {
    addNotification(
      message,
      "success",
      duration,
      group,
      data,
      onNotificationClick
    );
  },
};
export const notification = notify;
export const notifyQueue = reactive([]);

let id = 0;

function uniqueId() {
  return ++id;
}

function addNotification(
  message,
  type,
  duration = 2500,
  group,
  data,
  onNotificationClick
) {
  let notification = {
    message: message,
    type: type,
    duration: duration,
    id: uniqueId(),
    onNotificationClick: () => {
      dismiss();
      if (onNotificationClick && onNotificationClick instanceof Function) {
        onNotificationClick(data);
      }
    },
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
