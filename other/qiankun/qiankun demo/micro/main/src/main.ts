import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { registerMicroApps, start } from "../../micro-fe";

registerMicroApps([
  {
    name: "app-vue",
    entry: "//localhost:9003",
    container: "#sub-container",
    activeRule: "/subapp/app-vue",
  },
  {
    name: "app-vue",
    entry: "//localhost:9003",
    container: "#sub-container",
    activeRule: "/subapp/app-vue2",
  },
]);
start();
createApp(App).use(router).mount("#app");

/**

export const subList = [
  {
    name: "vue3",
    activeRule: "/vue3",
    container:"#sub-caontiner",
    entry:"//localhost:9005"
  },
  {
    name: "vue2",
    activeRule: "/vue2",
    container:"#sub-caontiner",
    entry:"//localhost:9006" // 未创建
  },
  {
    name: "react",
    activeRule: "/react",
    container:"#sub-caontiner",
    entry:"//localhost:9007" // 未创建
  },
]

 */
