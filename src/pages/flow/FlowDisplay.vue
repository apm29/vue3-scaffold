<template>
  <div class="tw-w-full tw-h-full">
    <FlowGraph
      @click:end-node="log"
      @click:start-node="log"
      @click:add-node="log"
      v-model:graph-data="graphData"
      :editable="false"
      ref="graph"
    >
    </FlowGraph>
    <v-btn class="tw-fixed tw-bottom-4 tw-right-4" @click="add">ADD</v-btn>
    <div
      v-if="false"
      class="tw-w-40 tw-h-40 overflow-auto tw-fixed tw-top-4 tw-right-4"
    >
      {{ graphData && graphData.nodes.map((it) => it.id) }}
    </div>
  </div>
</template>

<script>
import FlowGraph from "@/pages/flow/graph/FlowGraph.vue";
import { createApproveNode } from "@/pages/flow/nodes/approveNode";

export default {
  name: "FlowEditor",
  components: { FlowGraph },
  data() {
    return {
      graphData: {
        nodes: [],
      },
    };
  },
  methods: {
    log() {
      console.log(this.graphData);
    },
    add() {
      this.graphData.nodes.push(createApproveNode({}, false));
      //this.$refs.graph.read(this.graphData);
    },
  },
};
</script>

<style scoped></style>
