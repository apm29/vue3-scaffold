<template>
  <div>
    <VerifyCodeField
      :rules="rules"
      v-model:value="code"
      v-model:is-validate="validate"
      placeholder="请输入验证码"
      ref="verify"
    ></VerifyCodeField>
    {{ code }}
    <v-btn block @click="validateInput">{{ validate }}</v-btn>
    <v-btn block @click="resetInputValidation">RESET VALIDATION</v-btn>
    <v-btn block @click="resetInput">RESET</v-btn>
    <v-btn block @click="toAbort">Abort</v-btn>
  </div>
</template>

<script>
import VerifyCodeField from "@/components/VerifyCodeField";
import { useRouter } from "vue-router";
export default {
  name: "Home",
  components: { VerifyCodeField },
  data: () => ({
    logo: require("@/assets/logo.svg"),
    code: "3333",
    validate: false,
    rules: [
      (v) => Boolean(v) || "验证码不能为空",
      (v) => v.length === 6 || "必须为6位验证码",
    ],
  }),
  methods: {
    validateInput() {
      this.validate = this.$refs.verify.validate();
    },
    resetInput() {
      this.$refs.verify.reset();
    },
    resetInputValidation() {
      this.$refs.verify.resetValidation();
    },
    toAbort() {
      this.$router.push({ path: "/abort" });
    },
  },
};
</script>
