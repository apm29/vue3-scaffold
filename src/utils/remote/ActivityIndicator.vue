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
        class="tw-flex task-item tw-text-lg"
      >
        <v-icon class="tw-w-6 tw-mr-4 tw-text-black">
          mdi-spin mdi-loading
        </v-icon>
        <div>{{ entry[0] }}</div>
        <i
          class="tw-w-6 tw-ml-4 mdi mdi-close hover:tw-text-red-500"
          @click="entry[1].cancel('用户取消')"
        >
        </i>
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

<style scoped></style>
