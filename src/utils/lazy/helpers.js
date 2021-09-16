export const isScrollable = function (ele) {
  // Compare the height to see if the element has scrollable content
  const hasScrollableContent = ele.scrollHeight > ele.clientHeight;

  // It's not enough because the element's `overflow-y` style can be set as
  // * `hidden`
  // * `hidden !important`
  // In those cases, the scrollbar isn't shown
  const overflowYStyle = window.getComputedStyle(ele).overflowY;
  const isOverflowScrollable =
    overflowYStyle.indexOf("auto") >= 0 ||
    overflowYStyle.indexOf("scroll") >= 0;

  return isOverflowScrollable;
};

export const nearestScrollableParentElement = function (ele) {
  let parentEle = ele;
  while (parentEle && !isScrollable(parentEle)) {
    parentEle = parentEle.parentElement;
  }
  return parentEle || window;
};
