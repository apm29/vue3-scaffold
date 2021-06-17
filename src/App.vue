<template>
  <router-view v-slot="{ Component }" class="tw-h-full">
    <v-slide-x-transition>
      <keep-alive>
        <component :is="Component" class="tw-h-full" />
      </keep-alive>
    </v-slide-x-transition>
    <Notification></Notification>
  </router-view>
</template>
<script>
import Notification from "@/utils/notification/Notification";
export default {
  components: { Notification },
};
</script>
