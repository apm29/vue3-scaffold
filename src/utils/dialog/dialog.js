import { reactive } from "vue";

export const dialogStore = reactive({
  show: false,
  type: "confirm",
  message: "",
  cancelText: "取消",
  confirmText: "确认",
  confirm: function () {},
  cancel: function () {},
});

export const dialog = {
  confirm(message) {
    return new Promise((resolve, reject) => {
      try {
        dialogStore.message = message;
        dialogStore.show = true;
        dialogStore.type = "confirm";
        dialogStore.confirm = function () {
          dialogStore.show = false;
          resolve(true);
        };
        dialogStore.cancel = function () {
          dialogStore.show = false;
          resolve(false);
        };
      } catch (e) {
        reject(e);
      }
    });
  },
  alert(message) {
    return new Promise((resolve, reject) => {
      try {
        dialogStore.message = message;
        dialogStore.show = true;
        dialogStore.type = "alert";
        dialogStore.cancel = function () {
          dialogStore.show = false;
          resolve(false);
        };
        dialogStore.confirm = function () {
          dialogStore.show = false;
          resolve(true);
        };
      } catch (e) {
        reject(e);
      }
    });
  },
};
