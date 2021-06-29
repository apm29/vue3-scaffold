import G6 from "@antv/g6";
import { onMounted, onUnmounted } from "vue";
import { typeStartNode } from "@/pages/flow/nodes/startNode";
import { typeAddNode } from "@/pages/flow/nodes/addNode";
import { typeEndNode } from "@/pages/flow/nodes/endNode";
import { typeAddConditionNode } from "@/pages/flow/nodes/addConditionNode";

function createMiniMapPlugin(miniMapContainerId) {
  return new G6.Minimap({
    size: [180, 150],
    className: "minimap",
    type: "default",
    container: miniMapContainerId,
  });
}

function createGridPlugin() {
  return new G6.Grid();
}
function createToolbarPlugin() {
  return new G6.ToolBar();
}

function createGraph(graphContainerId, element, minimap, grid, toolbar) {
  return new G6.Graph({
    container: graphContainerId, // String | HTMLElement，必须，在 Step 1 中创建的容器 id 或容器本身
    width: element.clientWidth, // Number，必须，图的宽度
    height: element.clientHeight, // Number，必须，图的高度
    plugins: [minimap, grid, toolbar],
    enabledStack: true,
    defaultEdge: {
      type: "polyline",
      color: "#4141e7",
      lineWidth: 3,
    },
    layout: {
      // Object，可选，布局的方法及其配置项，默认为 random 布局。
      type: "dagre", // 指定为力导向布局
      rankdir: "TB",
      nodesep: 30,
      ranksep: 20,
      controlPoints: true, // 是否保留布局连线的控制点
      workerEnabled: false, //是否启用 web-worker 以防布局计算时间过长阻塞页面交互
      sortByCombo: true, //同一层节点是否根据每个节点数据中的 comboId 进行排序，以防止 combo 重叠
      preventOverlap: true, // 防止节点重叠
      nodeSize: [380, 100], // 节点大小，用于算法中防止节点重叠时的碰撞检测。由于已经在上一节的元素配置中设置了每个节点的 size 属性，则不需要在此设置 nodeSize。
      linkDistance: 100, // 指定边距离为100
    },
    modes: {
      default: [
        "drag-canvas",
        "zoom-canvas",
        // "drag-node",
        {
          type: "tooltip", // 提示框
          formatText(model) {
            // 提示框文本内容
            return JSON.stringify(model, null, " ");
          },
        },
      ], // 允许拖拽画布、放缩画布、拖拽节点
    },
    // 节点不同状态下的样式集合
    nodeStateStyles: {
      // 鼠标 hover 上节点，即 hover 状态为 true 时的样式
      hover: {
        fill: "lightsteelblue",
      },
      // 鼠标点击节点，即 click 状态为 true 时的样式
      click: {
        stroke: "#1616cd",
        lineWidth: 3,
      },
    },
    // 边不同状态下的样式集合
    edgeStateStyles: {
      // 鼠标点击边，即 click 状态为 true 时的样式
      click: {
        stroke: "steelblue",
      },
      type: "line",
      style: {
        stroke: "#ddd",
        endArrow: {
          path: G6.Arrow.vee(10, 20, 3), // 使用内置箭头路径函数，参数为箭头的 宽度、长度、偏移量（默认为 0，与 d 对应）
          d: 3,
        },
      },
      sourceAnchor: 1,
      targetAnchor: 0,
    },
  });
}

//负责antv@g6的 graph初始化/事件监听以及大小自适应
export function userGraph(
  data,
  graphContainerId,
  miniMapContainerId,
  graphRef
) {
  onMounted(() => {
    const toolbar = createToolbarPlugin();
    const minimap = createMiniMapPlugin(miniMapContainerId);
    const grid = createGridPlugin();
    const element = document.getElementById(graphContainerId);
    let graph = createGraph(graphContainerId, element, minimap, grid, toolbar);
    graphRef.value = graph;

    graph.data(data); // 读取 Step 2 中的数据源到图上
    graph.render(); // 渲染图 布局将在调用  graph.render() 时执行计算。
    //graph.fitCenter(); //调整视口适应视图，不缩放，仅将图 bbox 中心对齐到画布中心
    graph.fitView(40); //调整视口适应视图
    graph.on("afterlayout", () => {
      graph.fitView(40); //调整视口适应视图
    });
  });
}

export function handleResize(graphContainerId, graphRef) {
  let onResize = () => {
    const element = document.getElementById(graphContainerId);
    if (element) {
      graphRef.value?.changeSize(element.clientWidth, element.clientHeight);
    }
  };
  onMounted(() => {
    window.addEventListener("resize", onResize);
  });
  onUnmounted(() => {
    window.removeEventListener("resize", onResize);
  });
}

export function registerEvent(
  emit,
  graphRef,
  menuOption,
  onAddMoreConditionNode
) {
  const onMouseEnter = (e) => {
    const graph = graphRef.value;
    const nodeItem = e.item; // 获取鼠标进入的节点元素对象
    graph.setItemState(nodeItem, "hover", true); // 设置当前节点的 hover 状态为 true
  };

  const onMouseLeave = (e) => {
    const graph = graphRef.value;
    const nodeItem = e.item; // 获取鼠标离开的节点元素对象
    graph.setItemState(nodeItem, "hover", false); // 设置当前节点的 hover 状态为 false
  };
  const onNodeClick = (e) => {
    const graph = graphRef.value;
    // 先将所有当前是 click 状态的节点置为非 click 状态
    const clickNodes = graph.findAllByState("node", "click");
    clickNodes.forEach((cn) => {
      graph.setItemState(cn, "click", false);
    });
    const nodeItem = e.item; // 获取被点击的节点元素对象
    menuOption.show = false;
    if (clickNodes.find((it) => it.id === nodeItem.id)) {
      return;
    }

    let model = nodeItem.getModel();
    switch (model.type) {
      case typeStartNode:
        emit("click:start-node", model);
        break;
      case typeAddNode: {
        menuOption.show = true;
        menuOption.nodeModel = model;
        menuOption.node = nodeItem;
        menuOption.x = e.originalEvent.clientX;
        menuOption.y = e.originalEvent.clientY;
        emit("click:add-node", model);
        break;
      }
      case typeEndNode:
        emit("click:end-node", model);
        break;
      case typeAddConditionNode:
        onAddMoreConditionNode(nodeItem, model, graph);
        emit("click:add-condition-node", model);
        break;
      default:
        break;
    }
    graph.setItemState(nodeItem, "click", true); // 设置当前节点的 click 状态为 true
  };

  const onEdgeClick = (e) => {
    const graph = graphRef.value;
    // 先将所有当前是 click 状态的边置为非 click 状态
    const clickEdges = graphRef.value?.findAllByState("edge", "click");
    clickEdges.forEach((ce) => {
      graph.setItemState(ce, "click", false);
    });
    const edgeItem = e.item; // 获取被点击的边元素对象
    if (clickEdges.indexOf(edgeItem) >= 0) {
      return;
    }
    graph.setItemState(edgeItem, "click", true); // 设置当前边的 click 状态为 true
  };

  const onCanvasClick = (e) => {
    const graph = graphRef.value;
    // 先将所有当前是 click 状态的节点置为非 click 状态
    const clickNodes = graph.findAllByState("node", "click");
    clickNodes.forEach((cn) => {
      graph.setItemState(cn, "click", false);
    });
    menuOption.show = false;
  };

  onMounted(() => {
    const graph = graphRef.value;
    // 鼠标进入节点
    graph.on("node:mouseenter", onMouseEnter);
    // 鼠标离开节点
    graph.on("node:mouseleave", onMouseLeave);
    // 点击节点
    graph.on("node:click", onNodeClick);
    // 点击边
    graph.on("edge:click", onEdgeClick);
    //画布点击事件
    graph.on("canvas:click", onCanvasClick);
  });

  onUnmounted(() => {
    const graph = graphRef.value;
    // 鼠标进入节点
    graph.off("node:mouseenter", onMouseEnter);
    // 鼠标离开节点
    graph.off("node:mouseleave", onMouseLeave);
    // 点击节点
    graph.off("node:click", onNodeClick);
    // 点击边
    graph.off("edge:click", onEdgeClick);
    //画布点击事件
    graph.off("canvas:click", onCanvasClick);
  });
}
