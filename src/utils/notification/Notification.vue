<template>
  <div
    class="tw-absolute tw-top-1 tw-right-1.5 tw-flex tw-flex-col tw-items-end"
    v-bind="$attrs"
  >
    <v-slide-y-transition hide-on-leave group>
      <div
        v-for="notification of notifyQueue"
        :key="notification.id"
        class="notification-wrapper"
        :class="[notification.type]"
        v-ripple
        @click="
          $emit('notification-click', notification);
          notification.dismiss();
        "
      >
        <div class="tw-flex-grow tw-text-left">
          {{ notification.message }}
        </div>
        <v-icon>
          {{ getIcon(notification.type) }}
        </v-icon>
      </div>
    </v-slide-y-transition>
  </div>
</template>

<script>
import { notifyQueue } from "@/utils/notification/notify";

export default {
  name: "Notification",
  emits: ["notification-click"],
  setup() {
    let getIcon = function (type) {
      switch (type) {
        case "error":
          return "mdi-alert";
        case "warning":
          return "mdi-alert-decagram";
        case "success":
          return "mdi-check-circle";
        case "info":
          return "mdi-information-outline";
        default:
          return "mdi-information";
      }
    };
    return {
      notifyQueue,
      getIcon,
    };
  },
};
</script>

<style scoped>
.notification-wrapper {
  @apply tw-px-8 tw-py-3 tw-rounded-xl tw-shadow-2xl tw-mb-2
  tw-border-l-8 tw-border-t-0 tw-border-b-0 tw-border-r-0 tw-border-solid
  tw-font-bold tw-text-lg tw-flex tw-items-center tw-flex-nowrap;
  min-width: 16rem;
  min-height: 4rem;
}

.error {
  @apply tw-bg-red-500 tw-text-white tw-border-red-200;
}
.info {
  @apply tw-bg-white tw-text-gray-600 tw-border-lightBlue-300;
}

.success {
  @apply tw-bg-green-500 tw-text-white  tw-border-green-200;
}

.warning {
  @apply tw-bg-amber-500 tw-text-white tw-border-amber-200;
}
</style>
