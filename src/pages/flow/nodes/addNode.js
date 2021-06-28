import G6 from "@antv/g6";
import { uniqueId } from "@/pages/flow/unique";
import chevron_right from "../icons/chevron_right.svg";

export const typeAddNode = "addNode";
export const registerAddNode = () =>
  G6.registerNode(
    typeAddNode,
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
            label: "选择审批人",
            editable: true,
          },
          cfg
        );
        const mainId = cfg.id;
        const r = 30;
        const keyShape = group.addShape("circle", {
          attrs: {
            id: mainId,
            x: 0,
            y: 0,
            stroke: "#3292f0",
            fill: "#3292f0", //此处必须有fill 不然不能触发事件
            r: r,
            shadowColor: "#3333",
            shadowBlur: 4,
            shadowOffsetX: 4,
            shadowOffsetY: 4,
          },
        });
        //绘制加号
        let crossThickness = 3;
        group.addShape("rect", {
          attrs: {
            x: -r / 2,
            y: -crossThickness / 2,
            width: r,
            height: crossThickness,
            id: uniqueId("rect"),
            fill: "white",
            parent: mainId,
          },
        });
        group.addShape("rect", {
          attrs: {
            x: -crossThickness / 2,
            y: -r / 2,
            width: crossThickness,
            height: r,
            id: uniqueId("rect"),
            fill: "white",
            parent: mainId,
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
        //一个在顶部一个在底部
        return [
          [0.5, 0],
          [0.5, 1],
        ];
      },
    },
    "single-node"
  );

export function createAddNode(id = uniqueId("add-node"), label = "添加节点") {
  return {
    id,
    type: typeAddNode,
    label,
  };
}
