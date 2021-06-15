<template>
  <label class="tw-flex tw-flex-nowrap tw-justify-center">
    <input
      :value="captcha[index]"
      class="input-cell"
      v-for="(value, index) in size"
      :key="value"
      @keydown="(event) => onAnyKeyDown(index, event)"
      maxlength="1"
      ref="input"
      :disabled="internalDisabled"
      :readonly="internalReadOnly"
      v-bind="$attrs"
      autocapitalize="characters"
    />
  </label>
  <v-slide-y-reverse-transition>
    <div class="tw-text-red-500 tw-text-sm" v-if="error">{{ error }}</div>
  </v-slide-y-reverse-transition>
</template>

<script>
import {
  computed,
  inject,
  onDeactivated,
  reactive,
  ref,
  toRefs,
  getCurrentInstance,
  watch,
} from "vue";

export default {
  name: "VerifyCodeField",
  props: {
    size: {
      type: Number,
      default: 6,
    },
    readonly: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    rules: {
      type: Array,
      default: function () {
        return [];
      },
    },
    value: {
      type: String,
    },
  },
  setup(props, context) {
    let { value, rules, readonly, disabled } = toRefs(props);

    //region 输入相关
    let captcha = reactive([]);
    let captchaStr = computed(() =>
      captcha.filter((it) => it !== undefined && it !== null).join("")
    );

    let onAnyKeyDown = function (index, event) {
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
    //endregion

    //region 验证相关
    let error = ref("");
    const form = inject("form", {
      disabled: false,
      readonly: false,
      lazyValidation: false,
      register() {},
      unregister() {},
    });
    let componentInternalInstance = getCurrentInstance();
    form.register(componentInternalInstance);
    onDeactivated(() => {
      form.unregister(componentInternalInstance);
    });
    let hasError = computed(() => Boolean(error.value));
    let internalReadOnly = computed(
      () => Boolean(readonly.value) || Boolean(form.readonly)
    );
    let internalDisabled = computed(
      () => Boolean(disabled.value) || Boolean(form.disabled)
    );

    let validate = function () {
      const errorBucket = [];
      if (!rules.value || !rules.value.length) {
        return true;
      }
      for (let index = 0; index < rules.value.length; index++) {
        const rule = rules.value[index];
        const valid = typeof rule === "function" ? rule(value.value) : rule;

        if (valid === false || typeof valid === "string") {
          errorBucket.push(valid || "");
        } else if (typeof valid !== "boolean") {
          console.log(
            `Rules should return a string or boolean, received '${typeof valid}' instead`
          );
        }
      }
      error.value = errorBucket.join(",");
      return errorBucket.length === 0;
    };

    watch(value, () => {
      if (!form.lazyValidation) {
        validate();
      }
    });

    let resetValidation = function () {
      error.value = null;
    };
    let reset = function () {
      error.value = null;
      context.$emit("update:value", null);
    };
    //endregion
    return {
      captcha,
      captchaStr,
      onAnyKeyDown,

      validate,
      resetValidation,
      reset,
      error,
      hasError,
      internalDisabled,
      internalReadOnly,
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
