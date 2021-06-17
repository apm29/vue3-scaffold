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
    <v-btn
      block
      @click="
        notification.error(
          'asdadas获取微乎其微企鹅号奥施康定很快就暗红色的123asdasdasdasdasdadas获取微乎其微企鹅号奥施康定很快就暗红色的123asdasdasdasdasdadas获取微乎其微企鹅号奥施康定很快就暗红色的123asdasdasdasd'
        )
      "
      >error</v-btn
    >
    <v-btn block @click="notification.success(123)">success</v-btn>
    <v-btn block @click="notification.warning(123)">warning</v-btn>
    <v-btn block @click="notification.info(123)">info</v-btn>
    <v-btn block @click="testDialog">program-dialog</v-btn>
    <v-btn block @click="testDialog2">program-dialog2</v-btn>
  </div>
</template>

<script>
import VerifyCodeField from "@/components/VerifyCodeField.vue";
import { notification } from "@/utils/notification/notify";
import { dialog } from "@/utils/dialog/dialog";
export default {
  name: "Home",
  components: { VerifyCodeField },
  data: () => ({
    code: "3333",
    validate: false,
    show: false,
    rules: [
      (v) => Boolean(v) || "验证码不能为空",
      (v) => v.length === 6 || "必须为6位验证码",
    ],
    notification,
    dialog,
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
    async testDialog() {
      if (await dialog.confirm("确认关闭吗?")) {
        alert("已关闭");
      }
    },
    async testDialog2() {
      if (await dialog.alert("你好")) {
        alert("已关闭");
      }
    },
  },
};
</script>
