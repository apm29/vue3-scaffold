<template>
  <img alt="Vue logo" src="./assets/logo.png" />
  <HelloWorld msg="Hello Vue 3.0 + Vite" />
  <div class="tw-p-12 tw-bg-gray-100">
    <div class="tw-font-bold tw-shadow-lg tw-ring-2 tw-ring-blue-400 tw-ring-offset-4 tw-bg-green-500 tw-m-11">
      123
    </div>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',

  components: {
    HelloWorld,
  },

  data: () => ({
    //
  }),
}
</script>
