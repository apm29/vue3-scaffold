import { reactive } from "vue";

export const store = reactive({});

export function startLoading(tag, taskName, cancelToken) {
  if (!store[tag]) {
    store[tag] = { count: 0, token: new Map() };
  }
  store[tag].count += 1;
  if (taskName && cancelToken) {
    store[tag].token.set(taskName, cancelToken);
  }
}

export function stopLoading(tag, taskName) {
  if (!store[tag]) {
    store[tag] = { count: 0, token: new Map() };
  }
  store[tag].count -= 1;
  if (taskName) {
    store[tag].token.delete(taskName);
  }
}
