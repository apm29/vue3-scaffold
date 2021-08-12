<template>
  <transition name="van-fade">
    <van-overlay
      class-name="flex flex-col justify-center items-center"
      :show="store.app && store.app.count > 0"
    >
      <van-loading type="spinner" class="mb-4" />
      <div
        v-for="(entry, index) of store.app.token.entries()"
        :key="index"
        class="flex text-lg p-2 items-center mb-2"
      >
        <i
          class="
            text-2xl
            mr-4
            text-green-600
            flex-shrink-0
            mdi mdi-spin mdi-loading
          "
        >
        </i>
        <div class="text-white text-left font-bold flex-grow max-line-3">
          {{ entry[0] }}
        </div>
        <div
          class="text-sm ml-4 text-red-500 flex-shrink-0"
          @click="entry[1].cancel('用户取消')"
        >
          取消任务
        </div>
      </div>
    </van-overlay>
  </transition>
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
