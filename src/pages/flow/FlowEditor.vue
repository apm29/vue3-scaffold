<template>
  <FlowGraph
    @click:end-node="log"
    @click:start-node="log"
    @click:add-node="log"
  ></FlowGraph>
</template>

<script>
import FlowGraph from "@/pages/flow/graph/FlowGraph.vue";

export default {
  name: "FlowEditor",
  components: { FlowGraph },
  methods: {
    log() {
      console.log(arguments);
    },
  },
};
</script>

<style scoped></style>
