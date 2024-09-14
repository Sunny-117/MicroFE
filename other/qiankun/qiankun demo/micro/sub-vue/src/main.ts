import { createApp, App } from "vue";
import './public-path'
import AppC from "./App.vue";
let app: App | null = null;

const render = (props: any) => {
  const { container } = props;
  app = createApp(AppC);
  app.mount(container ? container.querySelector("#app") : "#app");
};

export const bootstrap = async () => {
  console.log("bootstrap");
};

export const mount = async props => {
  console.log('mount')
  render(props);
};

export const unmount = async () => {
  console.log("unmount");
  app?.unmount()
  app = null
};
// 环境判断
if (!(window as any).__POWERED_BY_QIANKUN__) {
  mount({});
}
