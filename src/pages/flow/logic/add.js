import { createApproveNode } from "@/pages/flow/nodes/approveNode";
import { createAddNode } from "@/pages/flow/nodes/addNode";
import { createEdge } from "@/pages/flow/graph/edges";
import { onError } from "@/pages/flow/graph/configs";
import { createConditionNode } from "@/pages/flow/nodes/conditionNode";
import { createAddConditionNode } from "@/pages/flow/nodes/addConditionNode";
import { createCrossNode, typeCrossNode } from "@/pages/flow/nodes/crossNode";
import { findLCANode } from "@/pages/flow/logic/common";

export const addApproveNode = (model, node, graph, menuOption) => {
  menuOption.show = false;
  graph.setItemState(node, "click", false);
  let outEdges = node.getOutEdges();
  if (!outEdges || !outEdges.length) {
    onError(`添加节点-${model.id} 不存在OutEdges`);
    return;
  }
  const approveNode = createApproveNode({});
  const addNode = createAddNode();
  graph.addItem("node", approveNode);
  graph.addItem("node", addNode);
  graph.addItem("edge", createEdge(approveNode.id, addNode.id));
  let outEdge = outEdges[0].getModel();
  graph.updateItem(outEdge.id, {
    source: addNode.id,
    target: outEdge.target,
  });
  graph.addItem("edge", createEdge(model.id, approveNode.id));

  graph.updateLayout({});
};

export const addActionNode = (model, node, graph, menuOption) => {
  menuOption.show = false;
  graph.setItemState(node, "click", false);
};
export const addConditionNode = (model, node, graph, menuOption) => {
  menuOption.show = false;
  graph.setItemState(node, "click", false);

  const conditionNode1 = createConditionNode(0);
  const conditionNode2 = createConditionNode(1);
  const addConditionNode = createAddConditionNode();
  let outEdges = node.getOutEdges();
  if (!outEdges || !outEdges.length) {
    onError(`添加节点-${model.id} 不存在OutEdges`);
    return;
  }
  graph.addItem("node", conditionNode1);
  graph.addItem("node", conditionNode2);
  graph.addItem("node", addConditionNode);

  graph.addItem("edge", createEdge(addConditionNode.id, conditionNode1.id));
  graph.addItem("edge", createEdge(addConditionNode.id, conditionNode2.id));

  let addNode1 = createAddNode();
  let addNode2 = createAddNode();
  let addNode3 = createAddNode();
  graph.addItem("node", addNode1);
  graph.addItem("node", addNode2);
  graph.addItem("node", addNode3);

  graph.addItem("edge", createEdge(conditionNode1.id, addNode1.id));
  graph.addItem("edge", createEdge(conditionNode2.id, addNode2.id));

  let outEdgeNode = outEdges[0];
  let outEdgeModel = outEdgeNode.getModel();
  const nextNode = outEdgeNode.getTarget();
  graph.updateItem(outEdgeModel.id, {
    source: model.id,
    target: addConditionNode.id,
  });

  let crossNode = createCrossNode();
  graph.addItem("node", crossNode);

  graph.addItem("edge", createEdge(addNode1.id, crossNode.id));
  graph.addItem("edge", createEdge(addNode2.id, crossNode.id));
  graph.addItem("edge", createEdge(crossNode.id, addNode3.id));
  graph.addItem("edge", createEdge(addNode3.id, nextNode.getModel().id));

  graph.updateLayout({});
};
export const addCopyNode = (model, node, graph, menuOption) => {
  menuOption.show = false;
  graph.setItemState(node, "click", false);
};

export const addMoreConditionNode = (node, model, graph) => {
  graph.setItemState(node, "click", false);

  let targetNodes = node.getNeighbors("target");

  const conditionNode = createConditionNode(targetNodes.length);
  graph.addItem("node", conditionNode);
  let addNode = createAddNode();
  graph.addItem("node", addNode);
  graph.addItem("edge", createEdge(conditionNode.id, addNode.id));

  //找到多个条件节点的公共CrossNode
  let crossNode = findLCANode(graph, model.id);

  graph.addItem("edge", createEdge(addNode.id, crossNode.getModel().id));
  graph.addItem("edge", createEdge(model.id, conditionNode.id));

  graph.updateLayout({});
};
