import Mock from "mockjs";
import "@/mock/test";
// 设置Mockjs全局属性
Mock.setup({
  timeout: "300-500",
});
console.warn("mocking...");
