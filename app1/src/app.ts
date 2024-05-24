import { history } from "umi";

export function render(oldRender) {
  oldRender()
}

let initPathName = '';

// src/app.ts
export const qiankun = {
  // 应用加载之前
  async bootstrap(props) {
    // console.log('app1 bootstrap', props, window.location.pathname);
  },
  // 应用 render 之前触发
  async mount(props) {
    // console.log('app1 mount', props, window.location.pathname);
    
  },

  // 应用卸载之后触发
  async unmount(props) {
    console.log('app1 unmount', props);
  },
};



export function onRouteChange({
  location,
  clientRoutes,
  routes,
  action,
  basename,
  isFirst,
}) {
  // console.log('app-1 onRouteChange',location,
  //   clientRoutes,
  //   routes,
  //   action,
  //   basename,
  //   isFirst,);
  window.history.pushState('', '', location.pathname)
  // window.location.pathname = location.pathname
}
