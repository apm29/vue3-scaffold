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
    <div
      v-if="menuOption.show"
      class="tw-absolute tw-z-10"
      :style="{
        left: `${menuOption.x}px`,
        top: `${menuOption.y}px`,
      }"
    >
      <div class="action-container">
        <div
          class="action-item tw-text-amber-500"
          @click="
            addApproveNode(
              menuOption.nodeModel,
              menuOption.node,
              graphRef,
              menuOption
            )
          "
        >
          <i class="mdi mdi-plus"></i>添加审批
        </div>
        <div
          class="action-item tw-text-green-500"
          @click="
            addCopyNode(
              menuOption.nodeModel,
              menuOption.node,
              graphRef,
              menuOption
            )
          "
        >
          <i class="mdi mdi-plus"></i>添加抄送
        </div>
        <div
          class="action-item tw-text-blue-500"
          @click="
            addActionNode(
              menuOption.nodeModel,
              menuOption.node,
              graphRef,
              menuOption
            )
          "
        >
          <i class="mdi mdi-plus"></i>添加办理
        </div>
        <div
          class="action-item tw-text-red-500"
          @click="
            addConditionNode(
              menuOption.nodeModel,
              menuOption.node,
              graphRef,
              menuOption
            )
          "
        >
          <i class="mdi mdi-plus"></i>添加条件
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, onUnmounted, reactive, shallowRef, toRefs } from "vue";
import { createStartNode, registerStartNode } from "../nodes/startNode";
import { handleResize, registerEvent, userGraph } from "../graph/graph";
import { createAddNode, registerAddNode } from "../nodes/addNode";
import { createEdge } from "../graph/edges";
import { createEndNode, registerEndNode } from "../nodes/endNode";
import { registerApproveNode } from "../nodes/approveNode";
import * as addLogic from "../logic/add";
import { registerConditionNode } from "../nodes/conditionNode";
import { registerAddConditionNode } from "../nodes/addConditionNode";
import { registerCrossNode } from "../nodes/crossNode";

export default {
  name: "FlowGraph",
  props: ["graphData"],
  emits: [
    "click:end-node",
    "click:start-node",
    "click:add-node",
    "click:add-condition-node",
  ],
  setup(props, context) {
    const { graphData } = toRefs(props);
    const { emit } = context;
    registerStartNode();
    registerAddNode();
    registerEndNode();
    registerApproveNode();
    registerConditionNode();
    registerAddConditionNode();
    registerCrossNode();
    let startNode = createStartNode({});
    let addNode = createAddNode();
    let endNode = createEndNode();
    let edge = createEdge(startNode.id, addNode.id);
    let edge1 = createEdge(addNode.id, endNode.id);
    const data = graphData.value || {
      // 点集
      nodes: [startNode, addNode, endNode],
      // 边集
      edges: [edge, edge1],
    };

    const graphContainerId = "flowGraph";
    const miniMapContainerId = "miniMap";
    const graphRef = shallowRef(null);

    userGraph(data, graphContainerId, miniMapContainerId, graphRef);
    handleResize(graphContainerId, graphRef);

    //新增审批节点
    const { addApproveNode, addActionNode, addCopyNode, addConditionNode } =
      addLogic;

    onMounted(() => {
      console.log(emit, graphRef);
      graphRef.value.on("node");
    });

    onUnmounted(() => {
      console.log(emit, graphRef);
    });

    const menuOption = reactive({
      show: false,
      x: 0,
      y: 0,
      nodeModel: null,
    });

    registerEvent(emit, graphRef, menuOption);

    return {
      graphContainerId,
      miniMapContainerId,
      menuOption,
      graphRef,
      addApproveNode,
      addActionNode,
      addCopyNode,
      addConditionNode,
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
    user-select: none;
  }

  .g6-grid {
    background-repeat: repeat !important;
  }

  .action-container {
    @apply tw-bg-white
    tw-shadow-lg
    tw-rounded-lg
    tw-px-2
    tw-py-2
    tw-select-none
    tw-ring-1
    tw-ring-blue-200
    tw-flex tw-flex-wrap tw-flex-col;
  }

  .action-item {
    @apply tw-text-sm
    hover:tw-shadow-lg tw-p-2
    tw-rounded
    tw-flex tw-items-center;
    .mdi {
      @apply tw-text-3xl tw-text-opacity-50 tw-mr-3;
    }
  }
}
</style>
