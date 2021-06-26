<template>
  <div
    :id="graphContainerId"
    class="tw-w-full tw-h-full tw-relative flow-graph"
  >
    <div
      :id="miniMapContainerId"
      class="
        tw-absolute
        tw-left-4
        tw-bottom-4
        tw-shadow-lg
        tw-ring-1
        tw-ring-blue-800
        tw-rounded-lg
        tw-bg-white
      "
    ></div>
  </div>
</template>

<script>
import { onMounted, ref, toRefs } from "vue";
import {
  createStartNode,
  registerStartNode,
} from "@/pages/flow/nodes/startNode";
import { handleResize, initGraph } from "@/pages/flow/graph/graph";

export default {
  name: "FlowGraph",
  props: ["graphData"],
  setup(props, context) {
    const { graphData } = toRefs(props);
    const { emit } = context;
    registerStartNode();
    const data = graphData.value || {
      // 点集
      nodes: [createStartNode({})],
      // 边集
      edges: [],
    };

    const graphContainerId = "flowGraph";
    const miniMapContainerId = "miniMap";
    const graphRef = ref(null);

    handleResize(graphContainerId, graphRef);

    onMounted(() => {
      graphRef.value = initGraph(
        data,
        graphContainerId,
        miniMapContainerId,
        emit
      );
    });

    return {
      graphContainerId,
      miniMapContainerId,
    };
  },
};
</script>

<style lang="scss">
.flow-graph {
  /* 提示框的样式 */
  .g6-tooltip {
    border: 1px solid #e2e2e2;
    border-radius: 4px;
    font-size: 12px;
    color: #545454;
    background-color: rgba(255, 255, 255, 0.9);
    padding: 10px 8px;
    box-shadow: rgb(174, 174, 174) 0 0 10px;
    max-width: 30vw;
  }

  .g6-component-contextmenu {
    border: 1px solid #e2e2e2;
    border-radius: 4px;
    font-size: 12px;
    color: #545454;
    background-color: rgba(255, 255, 255, 0.9);
    padding: 10px 8px;
    box-shadow: rgb(174, 174, 174) 0 0 10px;
    max-width: 30vw;
  }

  .g6-grid {
    background-repeat: repeat !important;
  }
}
</style>
