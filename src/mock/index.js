import Mock from "mockjs";
import "@/mock/test";
// 设置Mockjs全局属性
Mock.setup({
  timeout: "30000-500000",
});
console.warn("mocking...");
