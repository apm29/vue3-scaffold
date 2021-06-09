<template>
  <img alt="Vue logo" class="tw-h-12" :src="logo" />
  <div class="tw-bg-gradient-to-r tw-from-amber-500 tw-to-purple-300">
    <div class="tw-text-3xl tw-text-red-600 tw-font-extrabold">123</div>
  </div>
  <div>
    <VerifyCodeField v-model:value="code"></VerifyCodeField>
  </div>
  {{ code }}
  <v-text-field v-model="code"></v-text-field>
  <v-btn>123</v-btn>
</template>

<script>
import VerifyCodeField from "@/components/VerifyCodeField";
export default {
  name: "App",
  components: { VerifyCodeField },
  data: () => ({
    logo: require("@/assets/logo.svg"),
    code: undefined,
  }),
};
</script>
