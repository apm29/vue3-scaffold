<template>
  <img alt="Vue logo" class="tw-h-12" :src="logo" />
  <div class="tw-bg-gradient-to-r tw-from-amber-500 tw-to-purple-300">
    <div class="tw-text-3xl tw-text-red-600 tw-font-extrabold">123</div>
  </div>
  <div>
    <label>
      <input
        :value="captcha[index]"
        class="input-cell"
        v-for="(value, index) in 6"
        @input="(event) => changeCaptcha(index, event)"
        :key="value"
        ref="input"
      />
    </label>
    {{ captcha }}
  </div>
</template>

<script>
import { reactive } from "vue";

export default {
  name: "App",

  data: () => ({
    logo: require("@/assets/logo.svg"),
  }),

  setup(props) {
    let captcha = reactive([]);
    let changeCaptcha = function (index, event) {
      console.log(index, event.data);
      captcha[index] = event.data?.charAt(0) ?? " ";
      if (event.target.nextSibling && event.target.nextSibling.focus) {
        event.target.nextSibling.focus();
      }
    };
    return {
      captcha,
      changeCaptcha,
    };
  },
};
</script>
<style scoped>
.input-cell {
  @apply tw-w-12 tw-h-12
  tw-shadow-lg
  tw-rounded-lg
  tw-border-8
  tw-m-2 tw-p-2
  tw-ring-2 tw-ring-gray-200 tw-outline-none
  tw-text-center
  tw-font-light
  tw-text-4xl
  focus:tw-outline-none  focus:tw-shadow-2xl focus:tw-ring-2 focus:tw-ring-purple-500 focus:tw-border-trueGray-50;
}
</style>
