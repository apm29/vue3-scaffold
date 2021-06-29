//递归方式寻找LCA(最近共同父节点(这里是向下找共同的crossNode))
import { typeCrossNode } from "@/pages/flow/nodes/crossNode";
import { onError } from "@/pages/flow/graph/configs";

export const findNearestCrossNode = (
  graph,
  nodes,
  nodeStepMap,
  baseStep = 0
) => {
  nodes.forEach((node) => {
    let currentParent = node;
    let edges = node.getOutEdges();
    let startStep = baseStep;

    while (
      edges.length === 1 &&
      edges[0].getTarget().getModel().type !== typeCrossNode
    ) {
      let target = edges[0].getTarget();
      currentParent = target;
      edges = target.getOutEdges();
      startStep += 1;
    }

    if (edges.length === 1) {
      nodeStepMap.set(edges[0].getTarget(), startStep);
    } else {
      findNearestCrossNode(
        graph,
        edges.map((e) => e.getTarget()),
        nodeStepMap,
        ++startStep
      );
    }
  });
};

export function findLCANode(graph, parentId) {
  //找到距离parentNode边数最少的connectionNode(最短路径问题)
  let map = new Map();
  let nodes = graph
    .findAll("edge", (edge) => edge.getModel().source === parentId)
    .map((e) => e.get("target"));
  while (nodes.length > 1) {
    //当最短路径节点有多个时,继续往下寻找
    findNearestCrossNode(graph, nodes, map, 0);
    nodes = Array.from(map.keys()).reduce((sum, key) => {
      if (sum.length === 0) {
        sum.push(key);
      } else {
        sum = sum.filter((e) => map.get(e) <= map.get(key));
        if (sum.length === 0 || sum.every((e) => map.get(e) === map.get(key))) {
          sum.push(key);
        }
      }
      return sum;
    }, []);
  }
  return nodes[0];
}

export function getNextNode(node) {
  if (!node.getNeighbors("target") || node.getNeighbors("target").length > 1) {
    return onError("节点存在多个Target邻居节点");
  } else {
    return node.getNeighbors("target")[0];
  }
}
export function getPreviousNode(node) {
  if (!node.getNeighbors("source") || node.getNeighbors("source").length > 1) {
    return onError("节点存在多个Source邻居节点");
  } else {
    return node.getNeighbors("source")[0];
  }
}

export function doDelete(graph, startNode, stopNode) {
  startNode
    .get("edges")
    .filter((e) => e.get("source") === startNode)
    .forEach((edge) => {
      let newStartNode = edge.get("target");
      if (newStartNode !== stopNode) {
        doDelete(graph, newStartNode, stopNode);
      }
      graph.removeItem(edge);
    });
  //删除所有无边节点并且不是结束节点的
  graph
    .findAll("node", (node) => node.get("edges").length === 0)
    .filter((node) => node.getModel().type !== "endNode")
    .forEach((node) => {
      graph.removeItem(node);
    });
}
