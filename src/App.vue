<template>
  <img alt="Vue logo" class="tw-h-12" :src="logo" />
  <div class="tw-bg-gradient-to-r tw-from-amber-500 tw-to-purple-300">
    <div class="tw-text-3xl tw-text-red-600 tw-font-extrabold">123</div>
  </div>
</template>

<script>
export default {
  name: "App",

  data: () => ({
    logo: require("@/assets/logo.svg"),
  }),
};
</script>
