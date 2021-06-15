<template>
  <img alt="Vue logo" class="tw-h-12" :src="logo" />
  <div class="tw-bg-gradient-to-r tw-from-amber-500 tw-to-purple-300">
    <div class="tw-text-3xl tw-text-red-600 tw-font-extrabold">123</div>
  </div>
  <v-form v-model="validate" lazy-validation>
    <VerifyCodeField
      :rules="[(v) => Boolean(v) || '请输入验证码']"
      v-model:value="code"
      ref="verify"
    ></VerifyCodeField>
  </v-form>
  <v-btn block @click="validateInput">{{ validate }}</v-btn>
  <v-btn block @click="resetInput">RESET</v-btn>
</template>

<script>
import VerifyCodeField from "@/components/VerifyCodeField";
export default {
  name: "App",
  components: { VerifyCodeField },
  data: () => ({
    logo: require("@/assets/logo.svg"),
    code: undefined,
    validate: false,
  }),
  methods: {
    validateInput() {
      this.validate = this.$refs.verify.validate();
    },
    resetInput() {
      this.$refs.verify.resetValidation();
    },
  },
};
</script>
