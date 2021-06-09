<template>
  <label>
    <input
      :value="captcha[index]"
      class="input-cell"
      v-for="(value, index) in size"
      :key="value"
      @keydown="(event) => onAnyKeyDown(index, event)"
      maxlength="1"
      ref="input"
      v-bind="$attrs"
      autocapitalize="characters"
    />
  </label>
</template>

<script>
import { computed, reactive } from "vue";

export default {
  name: "VerifyCodeField",
  props: {
    size: {
      type: Number,
      default: 6,
    },
    value: {
      type: String,
    },
  },
  setup(props, context) {
    let captcha = reactive([]);
    let captchaStr = computed(() =>
      captcha.filter((it) => it !== undefined && it !== null).join("")
    );

    let onAnyKeyDown = function (index, event) {
      console.log(event);
      let input = event.target;
      if (
        captcha[index] !== event.key &&
        event.key.length === 1 &&
        !event.metaKey &&
        !event.ctrlKey
      ) {
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
        event.key.length === 1
      ) {
        event.target.nextSibling.focus();
      }

      context.emit("update:value", captchaStr);
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
  disabled:tw-shadow-none disabled:tw-border-trueGray-50 disabled:tw-bg-gray-100
  focus:tw-outline-none  focus:tw-shadow-2xl focus:tw-ring-4 focus:tw-ring-purple-500 focus:tw-border-trueGray-50;
}
</style>
