import { uniqueId } from "@/pages/flow/unique";

export function createEdge(fromId, toId) {
  return {
    source: fromId,
    target: toId,
    id: uniqueId("edge"),
  };
}
