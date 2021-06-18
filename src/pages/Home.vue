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
    <v-btn @click="validateInput">{{ validate }}</v-btn>
    <v-btn @click="resetInputValidation">RESET VALIDATION</v-btn>
    <v-btn @click="resetInput">RESET</v-btn>
    <v-btn @click="toAbort">Abort</v-btn>
    <v-btn
      @click="notification.error('ERRRRRRRRRRRRRRRRRRRRRRRROR', 2500000, 'tl')"
    >
      error
    </v-btn>
    <v-btn @click="notification.success(123)">success</v-btn>
    <v-btn @click="notification.warning(123)">warning</v-btn>
    <v-btn @click="notification.info(123)">info</v-btn>
    <v-btn
      @click="
        notification.info(123, 2500, 'tl', { a: 1 }, (data) => testDialog(data))
      "
    >
      info
    </v-btn>
    <v-btn @click="notification.info(123, 2500, 'bl')">info</v-btn>
    <v-btn @click="notification.info(123, 2500, 'br')">info</v-btn>
    <v-btn @click="notification.info(123, 2500, 'bc')">info</v-btn>
    <v-btn @click="notification.info(123, 2500, 'tc')">info</v-btn>
    <v-btn @click="testDialog()">program-dialog</v-btn>
    <v-btn @click="testDialog2()">program-dialog2</v-btn>
  </div>
</template>

<script>
import VerifyCodeField from "@/components/VerifyCodeField.vue";
import { notification } from "@/utils/notification/notify";
import { dialog } from "@/utils/dialog/dialog";
import remote from "@/utils/remote";
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
  async created() {
    let res = await remote.post({
      url: "/test/network",
      data: {},
    });
    console.log(res);
  },
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
    async testDialog(data = "确认关闭吗") {
      if (await dialog.confirm(data)) {
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
