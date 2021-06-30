<template>
  <v-fade-transition>
    <div
      v-if="store.app && store.app.count > 0"
      class="
        tw-fixed
        tw-top-0
        tw-left-0
        tw-h-screen
        tw-w-screen
        tw-flex
        tw-flex-col
        tw-justify-center
        tw-items-center
        tw-bg-gray-500
        tw-bg-opacity-70
      "
    >
      <div class="tw-relative tw-w-3/4">
        <img alt="cloud" :src="cloud" class="tw-w-full tw-animate-pulse" />
        <img
          alt="airplane"
          :src="airplane"
          class="
            tw-w-1/2 tw-absolute tw-transform tw-left-0 tw-top-0
            animation-fly-circle
          "
        />
      </div>
      <div
        v-for="(entry, index) of store.app.token.entries()"
        :key="index"
        class="
          tw-flex
          task-item
          tw-text-lg
          tw-p-2
          tw-bg-white
          tw-rounded-lg
          tw-items-center
          tw-ring-1
          tw-ring-sky-500
          tw-shadow-lg
          tw-mb-2
        "
      >
        <v-icon class="tw-text-2xl tw-mr-4 tw-text-green-600 tw-flex-shrink-0">
          mdi-spin mdi-loading
        </v-icon>
        <div
          class="
            tw-text-gray-600 tw-text-left tw-font-bold tw-flex-grow
            max-line-3
          "
        >
          {{ entry[0] }}
        </div>
        <div
          class="tw-text-sm tw-ml-4 tw-text-red-500 tw-flex-shrink-0"
          @click="entry[1].cancel('用户取消')"
        >
          取消任务
        </div>
      </div>
      <div class="tw-text-green-300 tw-mt-4">Loading...</div>
    </div>
  </v-fade-transition>
</template>

<script>
import { store } from "./store";
import airplane from "./assets/airplane.svg";
import cloud from "./assets/cloud.svg";

export default {
  name: "ActivityIndicator",
  setup() {
    return {
      store,
      airplane,
      cloud,
    };
  },
};
</script>

<style scoped>
@keyframes fly-circle {
  0% {
    left: 0;
    top: 25%;
  }
  25% {
    top: 0;
  }
  50% {
    left: 50%;
    top: 25%;
  }
  75% {
    top: 50%;
  }
  100% {
    left: 0;
    top: 25%;
  }
}
.animation-fly-circle {
  animation: 4s linear 0s infinite fly-circle;
}
.task-item {
  width: 75%;
}
.max-line-3 {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
  line-height: 1.25rem;
  max-height: 3.75rem;
}
</style>
