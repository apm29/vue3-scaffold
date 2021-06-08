<template>
  <div class="tw-bg-gradient-to-r tw-from-amber-500 tw-to-purple-300">
    <div class="tw-text-3xl tw-text-red-600 tw-font-extrabold">123</div>
  </div>
  <div>
    <label>
      <input
        :value="captcha[index]"
        class="input-cell"
        v-for="(value, index) in 6"
        :key="value"
        @keydown="(event) => onAnyKeyDown(index, event)"
        maxlength="1"
        ref="input"
        autocapitalize="characters"
      />
    </label>
  </div>
  {{ captchaStr }}
</template>

<script>
import { reactive, computed } from "vue";

export default {
  name: "App",
  setup(props) {
    let captcha = reactive([]);
    let captchaStr = computed(() =>
      captcha.filter((it) => it !== undefined && it !== null).join("")
    );

    let onAnyKeyDown = function (index, event) {
      console.log(event);
      let input = event.target;
      if (captcha[index] !== event.key && event.key.length === 1) {
        captcha[index] = event.key;
        event.preventDefault();
      }

      if (event.key === "Backspace") {
        captcha[index] = null;
        if (input.previousSibling && input.previousSibling.focus) {
          input.previousSibling.focus();
        }
        event.preventDefault();
      }

      if (
        event.target.nextSibling &&
        event.target.nextSibling.focus &&
        event.key !== "Backspace" &&
        event.key !== "Tab"
      ) {
        event.target.nextSibling.focus();
      }
    };
    return {
      captcha,
      captchaStr,
      onAnyKeyDown,
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
  tw-ring-1 tw-ring-gray-400 tw-outline-none
  tw-text-center
  tw-font-light
  tw-text-4xl
  tw-uppercase
  focus:tw-outline-none  focus:tw-shadow-2xl focus:tw-ring-2 focus:tw-ring-purple-500 focus:tw-border-trueGray-50;
}
</style>
