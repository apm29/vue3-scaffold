<template>
  <div>{{ booleanValue }}</div>
</template>

<script>
import { ref, toRaw, toRefs, watch } from "vue";

export default {
  name: "ModelInput",
  props: ["booleanValue"],
  setup(props) {
    let { booleanValue } = toRefs(props);
    watch(
      () => booleanValue,
      (value, oldValue) => {
        console.log(value === oldValue);
        console.log(value);
        console.log(JSON.stringify(value), JSON.stringify(oldValue));
      },
      { deep: true }
    );
  },
};
</script>

<style scoped></style>
