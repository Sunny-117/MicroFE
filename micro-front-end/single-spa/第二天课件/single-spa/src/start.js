import { reroute } from "./navigations/reroute";


export let started = false
export function start(){
    // 需要挂载应用
    started = true;
    reroute(); // 除了去加载应用还需要去挂载应用
}