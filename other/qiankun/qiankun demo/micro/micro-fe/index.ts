import rewriteRouter from "./rewriteRouter";
import handleRouter from "./handleRouter";
export type SubApp = {
  name: string;
  entry: string;
  container: string;
  activeRule: string;
  mount?: () => Promise<void>;
  unmount?: () => Promise<void>;
  bootstrap?: () => Promise<void>;
};
let _apps: SubApp[] = [];

export const getApps = () => _apps;

// 注册子应用
export const registerMicroApps = (apps: SubApp[]) => {
  console.log(apps)
  _apps = apps;
};

// 微前端运行原理
export const start = () => {
  // 1:监视路由变化，拦截路由 
  // 2. 匹配子应用
  // 3. 加载子应用
  // 4. 渲染子应用
  rewriteRouter();

  // 第一次默认执行一次路由匹配,第一次进来也能实现匹配，而不是经过了路由三种操作后匹配
  handleRouter();
};
