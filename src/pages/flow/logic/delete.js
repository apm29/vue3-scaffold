import { dialog } from "@/utils/dialog/dialog";
import { onError } from "@/pages/flow/graph/configs";

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
  }
}
