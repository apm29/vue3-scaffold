import G6 from "@antv/g6";
import { uniqueId } from "../unique";
import chevron_right from "../icons/chevron_right.svg";

export const typeCrossNode = "CrossNode";
export const registerCrossNode = () =>
  G6.registerNode(
    typeCrossNode,
    {
      options: {
        style: {},
        stateStyles: {
          hover: {},
          selected: {},
        },
      },
      /**
       * 绘制节点，包含文本
       * @param  {Object} cfg 节点的配置项
       * @param  {Group} group 图形分组，节点中图形对象的容器
       * @return {Shape} 返回一个绘制的图形作为 keyShape，通过 node.get('keyShape') 可以获取。
       * 关于 keyShape 可参考文档 核心概念-节点/边/Combo-图形 Shape 与 keyShape
       */
      draw(cfg, group) {
        cfg = Object.assign(
          {},
          {
            editable: true,
          },
          cfg
        );
        const mainId = cfg.id;
        const r = 30;
        const keyShape = group.addShape("circle", {
          attrs: {
            id: mainId,
            parent: mainId,
            x: 0,
            y: 0,
            r: 5,
            fill: "#ffffff",
            stroke: "#4444",
            opacity: 1,
          },
        });
        return keyShape;
      },
      /**
       * 绘制后的附加操作，默认没有任何操作
       * @param  {Object} cfg 节点的配置项
       * @param  {Group} group 图形分组，节点中图形对象的容器
       */
      afterDraw(cfg, group) {},
      /**
       * 更新节点，包含文本
       * @override
       * @param  {Object} cfg 节点的配置项
       * @param  {Node} node 节点
       */
      update(cfg, node) {},
      /**
       * 更新节点后的操作，一般同 afterDraw 配合使用
       * @override
       * @param  {Object} cfg 节点的配置项
       * @param  {Node} node 节点
       */
      afterUpdate(cfg, node) {},
      /**
       * 响应节点的状态变化。
       * 在需要使用动画来响应状态变化时需要被复写，其他样式的响应参见下文提及的 [配置状态样式] 文档
       * @param  {String} name 状态名称
       * @param  {Object} value 状态值
       * @param  {Node} node 节点
       */
      setState(name, value, node) {
        const group = node.getContainer();
        if (group.get("children") && group.get("children").length) {
          const shape = group.get("children")[0]; // 顺序根据 draw 时确定
          if (name === "hover") {
            const hoverStyles = () => {
              shape.attr("shadowBlur", 10);
              shape.attr("shadowOffsetX", 8);
              shape.attr("shadowOffsetY", 8);
            };
            const unHoverStyles = () => {
              shape.attr("shadowBlur", 4);
              shape.attr("shadowOffsetX", 4);
              shape.attr("shadowOffsetY", 4);
            };
            if (value) {
              hoverStyles();
            } else {
              unHoverStyles();
            }
          } else if (name === "click") {
            const selectedStyles = () => {
              shape.attr("stroke", "#33f");
              shape.attr("lineWidth", 2);
            };
            const unSelectedStyles = () => {
              shape.attr("stroke", "#ced4d9");
              shape.attr("lineWidth", 1);
            };
            node.getModel().selected = !node.getModel().selected;
            if (node.getModel().selected) {
              selectedStyles();
            } else {
              unSelectedStyles();
            }
          }
        }
      },
      /**
       * 获取锚点（相关边的连入点）
       * @param  {Object} cfg 节点的配置项
       * @return {Array|null} 锚点（相关边的连入点）的数组,如果为 null，则没有控制点
       */
      getAnchorPoints(cfg) {
        //全部在中心
        return [
          [0.5, 0.5],
          [0.5, 0.5],
        ];
      },
    },
    "single-node"
  );

export function createCrossNode(
  id = uniqueId("cross-node"),
  label = "交叉节点"
) {
  return {
    id,
    type: typeCrossNode,
    nodeData: {
      type: "cross",
      nodeId: id,
    },
    label,
  };
}
