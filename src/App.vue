<template>
  <v-app>
    <router-view v-slot="{ Component }" class="tw-h-full">
      <v-slide-x-transition>
        <keep-alive>
          <component :is="Component" class="tw-h-full" />
        </keep-alive>
      </v-slide-x-transition>
      <Notification></Notification>
      <Dialogs />
      <ActivityIndicator />
    </router-view>
  </v-app>
</template>
<script>
import Notification from "@/utils/notification/Notification.vue";
import Dialogs from "@/utils/dialog/Dialogs.vue";
import ActivityIndicator from "@/utils/remote/ActivityIndicator.vue";
export default {
  components: { ActivityIndicator, Dialogs, Notification },
};
</script>
