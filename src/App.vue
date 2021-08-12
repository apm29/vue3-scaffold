<template>
  <van-config-provider tag="div" class="w-full h-full">
    <router-view v-slot="{ Component }" class="h-full">
      <transition name="van-slide-left">
        <keep-alive>
          <component :is="Component" class="h-full" />
        </keep-alive>
      </transition>
      <ActivityIndicator />
    </router-view>
  </van-config-provider>
</template>
<script>
import ActivityIndicator from "@/utils/remote/ActivityIndicator.vue";
export default {
  components: { ActivityIndicator },
};
</script>
