<template>
  <div
    class="tw-absolute tw-top-1 tw-left-1.5 tw-flex tw-flex-col tw-items-start"
  >
    <v-slide-y-transition hide-on-leave group>
      <NotificationContent
        v-for="notification of notifyQueue.filter((it) => it.group === 'tl')"
        :notification="notification"
        :key="notification.id"
      />
    </v-slide-y-transition>
  </div>
  <div
    class="tw-absolute tw-top-1 tw-right-1.5 tw-flex tw-flex-col tw-items-end"
  >
    <v-slide-y-transition hide-on-leave group>
      <NotificationContent
        v-for="notification of notifyQueue.filter((it) => it.group === 'tr')"
        :notification="notification"
        :key="notification.id"
      />
    </v-slide-y-transition>
  </div>
  <div
    class="
      tw-absolute tw-bottom-5 tw-left-1.5 tw-flex tw-flex-col tw-items-start
    "
  >
    <v-slide-y-reverse-transition hide-on-leave group>
      <NotificationContent
        v-for="notification of notifyQueue.filter((it) => it.group === 'bl')"
        :notification="notification"
        :key="notification.id"
      />
    </v-slide-y-reverse-transition>
  </div>
  <div
    class="
      tw-absolute tw-bottom-5 tw-right-1.5 tw-flex tw-flex-col tw-items-end
    "
  >
    <v-slide-y-reverse-transition hide-on-leave group>
      <NotificationContent
        v-for="notification of notifyQueue.filter((it) => it.group === 'br')"
        :notification="notification"
        :key="notification.id"
      />
    </v-slide-y-reverse-transition>
  </div>

  <div
    class="
      tw-absolute
      tw-bottom-5
      tw-right-1.5
      tw-left-1.5
      tw-flex
      tw-flex-col
      tw-items-center
    "
  >
    <v-slide-y-reverse-transition hide-on-leave group>
      <NotificationContent
        v-for="notification of notifyQueue.filter((it) => it.group === 'bc')"
        :notification="notification"
        :key="notification.id"
      />
    </v-slide-y-reverse-transition>
  </div>
  <div
    class="
      tw-absolute
      tw-top-1
      tw-right-1.5
      tw-left-1.5
      tw-flex
      tw-flex-col
      tw-items-center
    "
  >
    <v-slide-y-reverse-transition hide-on-leave group>
      <NotificationContent
        v-for="notification of notifyQueue.filter((it) => it.group === 'tc')"
        :notification="notification"
        :key="notification.id"
      />
    </v-slide-y-reverse-transition>
  </div>
</template>

<script>
import { notifyQueue } from "./notify";
import NotificationContent from "@/utils/notification/NotificationContent.vue";

export default {
  name: "Notification",
  components: { NotificationContent },
  emits: ["notification-click"],
  setup() {
    return {
      notifyQueue,
    };
  },
};
</script>
