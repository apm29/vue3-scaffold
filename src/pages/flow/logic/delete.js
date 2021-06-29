import { dialog } from "@/utils/dialog/dialog";
import { onError } from "@/pages/flow/graph/configs";
import {
  doDelete,
  findLCANode,
  getNextNode,
  getPreviousNode,
} from "@/pages/flow/logic/common";

export async function deleteApproveNode(graph, node, model) {
  const confirm = await dialog.confirm("确认删除审批节点吗?");
  if (confirm) {
    const inEdges = node.getInEdges();
    const outEdges = node.getOutEdges();
    if (inEdges && inEdges.length === 1 && outEdges && outEdges.length === 1) {
      const sourceNode = node.getNeighbors("source")[0];
      const approveToAddEdge = outEdges[0];
      const sourceToApproveEdge = inEdges[0];
      if (
        !node.getNeighbors("target") ||
        node.getNeighbors("target").length > 1
      ) {
        onError("审批节点存在多个Target邻居节点");
        return;
      }
      const addNode = node.getNeighbors("target")[0];
      if (
        !addNode.getNeighbors("target") ||
        addNode.getNeighbors("target").length > 1
      ) {
        onError("新增节点存在多个Target邻居节点");
        return;
      }
      const targetNode = addNode.getNeighbors("target")[0];
      graph.updateItem(sourceToApproveEdge.get("id"), {
        source: sourceNode.get("id"),
        target: targetNode.get("id"),
      });
      graph.removeItem(approveToAddEdge);
      graph.removeItem(node);
      graph.removeItem(addNode);
      graph.updateLayout({});
    } else {
      onError(`审批节点 ${model.id} 未发现入/出边或存在多条入/出边`);
    }
  } else {
    graph.setItemState(node, "click", false);
  }
}

export async function deleteConditionNode(graph, node, model) {
  const confirm = await dialog.confirm("确认删除该条件节点吗?");
  if (confirm) {
    // 1. 找条件节点
    let parentNode = getPreviousNode(node);
    let parentId = parentNode.get("id");
    // 2. 根据同一层条件节点找LCA
    let nodeLCA = findLCANode(graph, parentId);
    //查询兄弟节点
    let siblingNodes = node
      .get("edges")
      .filter((e) => e.get("target") === node)[0]
      .get("source")
      .get("edges")
      .filter((e) => e.get("source") === parentNode)
      .map((edge) => edge.get("target"));

    if (siblingNodes.length === 2) {
      //从parentNode开始删除节点直到遇到LCA节点后的第二节点
      let nextNode = getNextNode(getNextNode(nodeLCA));
      let previousNode = getPreviousNode(parentNode);
      //连接前节点和下节点
      graph.addItem("edge", {
        source: previousNode.get("id"),
        target: nextNode.get("id"),
      });
      doDelete(graph, parentNode, nextNode);
      //删除startNode
      parentNode.get("edges").forEach((edge) => {
        graph.removeItem(edge);
      });
      graph.removeItem(parentNode);
    } else {
      //从node开始删除节点直到遇到LCA节点
      doDelete(graph, node, nodeLCA);
      //删除startNode
      node.get("edges").forEach((edge) => {
        graph.removeItem(edge);
      });
      graph.removeItem(node);
    }
    graph.updateLayout({});
  } else {
    graph.setItemState(node, "click", false);
  }
}
