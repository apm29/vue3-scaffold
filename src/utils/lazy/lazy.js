import { nearestScrollableParentElement } from "./helpers";

export default {
  onScroll() {
    console.log(arguments);
    console.log(2, this);
    console.log("onScroll");
  },

  mounted(el, target) {
    const scrollable = nearestScrollableParentElement(el);
    console.log(1, this);
    console.log("onMounted");
    scrollable.addEventListener("scroll", target.dir.onScroll.bind(el));
  },

  beforeUnmount(el, target) {
    const scrollable = nearestScrollableParentElement(el);
    console.log("onUnmounted");
    scrollable.removeEventListener("scroll", target.dir.onScroll.bind(el));
  },
};
