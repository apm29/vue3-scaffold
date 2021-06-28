import G6 from "@antv/g6";
import { onMounted, onUnmounted } from "vue";
import { typeStartNode } from "@/pages/flow/nodes/startNode";
import { typeAddNode } from "@/pages/flow/nodes/addNode";
import { typeEndNode } from "@/pages/flow/nodes/endNode";

export function userGraph(data, graphContainerId, miniMapContainerId, emit) {
  const toolbar = new G6.ToolBar();
  // 实例化 minimap 插件
  const minimap = new G6.Minimap({
    size: [180, 150],
    className: "minimap",
    type: "default",
    container: miniMapContainerId,
  });
  const grid = new G6.Grid();
  const menu = new G6.Menu({
    offsetX: 6,
    offsetY: 10,
    itemTypes: ["node"],
    getContent(e) {
      const outDiv = document.createElement("div");
      outDiv.style.width = "180px";
      outDiv.innerHTML = `<ul>
                              <li>测试01</li>
                              <li>测试01</li>
                              <li>测试01</li>
                              <li>测试01</li>
                            </ul>`;
      return outDiv;
    },
    handleMenuClick(target, item) {
      console.log(target, item.getModel());
    },
  });

  const element = document.getElementById(graphContainerId);
  const graph = new G6.Graph({
    container: graphContainerId, // String | HTMLElement，必须，在 Step 1 中创建的容器 id 或容器本身
    width: element.clientWidth, // Number，必须，图的宽度
    height: element.clientHeight, // Number，必须，图的高度
    plugins: [minimap, grid, menu, toolbar],
    layout: {
      // Object，可选，布局的方法及其配置项，默认为 random 布局。
      type: "dagre", // 指定为力导向布局
      rankdir: "TB",
      nodesep: 120,
      ranksep: 70,
      controlPoints: true, // 是否保留布局连线的控制点
      workerEnabled: true, //是否启用 web-worker 以防布局计算时间过长阻塞页面交互
      sortByCombo: true, //同一层节点是否根据每个节点数据中的 comboId 进行排序，以防止 combo 重叠
      preventOverlap: true, // 防止节点重叠
      nodeSize: [200, 150], // 节点大小，用于算法中防止节点重叠时的碰撞检测。由于已经在上一节的元素配置中设置了每个节点的 size 属性，则不需要在此设置 nodeSize。
      linkDistance: 100, // 指定边距离为100
    },
    modes: {
      default: [
        "drag-canvas",
        "zoom-canvas",
        "drag-node",
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
        stroke: "#4141e7",
        lineWidth: 2,
      },
    },
    // 边不同状态下的样式集合
    edgeStateStyles: {
      // 鼠标点击边，即 click 状态为 true 时的样式
      click: {
        stroke: "steelblue",
      },
    },
  });
  // 鼠标进入节点
  graph.on("node:mouseenter", (e) => {
    const nodeItem = e.item; // 获取鼠标进入的节点元素对象
    graph.setItemState(nodeItem, "hover", true); // 设置当前节点的 hover 状态为 true
  });

  // 鼠标离开节点
  graph.on("node:mouseleave", (e) => {
    const nodeItem = e.item; // 获取鼠标离开的节点元素对象
    graph.setItemState(nodeItem, "hover", false); // 设置当前节点的 hover 状态为 false
  });

  // 点击节点
  graph.on("node:click", (e) => {
    // 先将所有当前是 click 状态的节点置为非 click 状态
    const clickNodes = graph.findAllByState("node", "click");
    clickNodes.forEach((cn) => {
      graph.setItemState(cn, "click", false);
    });
    const nodeItem = e.item; // 获取被点击的节点元素对象
    if (clickNodes.indexOf(nodeItem) >= 0) {
      return;
    }

    switch (nodeItem.getModel().type) {
      case typeStartNode:
        emit("click:start-node", nodeItem.getModel());
        break;
      case typeAddNode:
        emit("click:add-node", nodeItem.getModel());
        break;
      case typeEndNode:
        emit("click:end-node", nodeItem.getModel());
        break;
      default:
        break;
    }

    graph.setItemState(nodeItem, "click", true); // 设置当前节点的 click 状态为 true
  });

  // 点击边
  graph.on("edge:click", (e) => {
    // 先将所有当前是 click 状态的边置为非 click 状态
    const clickEdges = graph.findAllByState("edge", "click");
    clickEdges.forEach((ce) => {
      graph.setItemState(ce, "click", false);
    });
    const edgeItem = e.item; // 获取被点击的边元素对象
    if (clickEdges.indexOf(edgeItem) >= 0) {
      return;
    }
    graph.setItemState(edgeItem, "click", true); // 设置当前边的 click 状态为 true
  });
  graph.data(data); // 读取 Step 2 中的数据源到图上
  graph.render(); // 渲染图 布局将在调用  graph.render() 时执行计算。
  graph.fitCenter(); //调整视口适应视图，不缩放，仅将图 bbox 中心对齐到画布中心
  return graph;
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
