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
        tw-opacity-50
      "
    >
      <div
        v-for="(entry, index) of store.app.token.entries()"
        :key="index"
        class="tw-flex task-item"
      >
        <v-icon class="tw-w-6 tw-mr-4 tw-text-black">
          mdi-spin mdi-loading
        </v-icon>
        <div>{{ entry[0] }}</div>
        <v-icon
          class="tw-w-6 tw-ml-4 close-icon"
          @click="entry[1].cancel('用户取消')"
        >
          mdi-close
        </v-icon>
      </div>
      <div class="tw-text-green-300 tw-mt-4">Loading...</div>
    </div>
  </v-fade-transition>
</template>

<script>
import { store } from "./store";

export default {
  name: "ActivityIndicator",
  setup() {
    return {
      store,
    };
  },
};
</script>

<style scoped>
.close-icon {
  visibility: hidden;
}

.task-item:hover > .close-icon {
  visibility: visible;
}
</style>
