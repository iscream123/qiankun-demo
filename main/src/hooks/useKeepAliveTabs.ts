import { useCallback, useEffect, useRef, useState } from 'react';
import useMatchRoute from './useMatchRoute';
import { history } from 'umi';

export interface KeepAliveTab {
  title: string;
  routePath: string;
  key: string; // 这个key，后面刷新有用到它
  pathname: string;
  icon?: any;
  children?: any;
  /** 是否是微应用 */
  isMicroApp: boolean;
}

function getKey() {
  return new Date().getTime().toString();
}

/**
 * 一个用来维护打开过的tab列表的hook
 */
const useKeepAliveTabs = () => {
  /** 维护打开过的tabs */
  const [keepAliveTabs, setKeepAliveTabs] = useState<KeepAliveTab[]>([]);
  /** 当前激活的路由 */
  const [activeTabRoutePath, setActiveTabRoutePath] = useState<string>('');

  const matchRoute = useMatchRoute();
  /** Tab显示事件 */
  const keepAliveShowEvents = useRef<Record<string, Array<() => void>>>({});
  /** Tab隐藏事件 */
  const keepAliveHiddenEvents = useRef<Record<string, Array<() => void>>>({});

  const onShow = useCallback(
    (cb: () => void) => {
      if (!keepAliveShowEvents.current[activeTabRoutePath]) {
        keepAliveShowEvents.current[activeTabRoutePath] = [];
      }
      keepAliveShowEvents.current[activeTabRoutePath].push(cb);
    },
    [activeTabRoutePath]
  );

  const onHidden = useCallback(
    (cb: () => void) => {
      if (!keepAliveHiddenEvents.current[activeTabRoutePath]) {
        keepAliveHiddenEvents.current[activeTabRoutePath] = [];
      }
      keepAliveHiddenEvents.current[activeTabRoutePath].push(cb);
    },
    [activeTabRoutePath]
  );

  /**
   * 关闭tab
   */
  const closeTab = useCallback(
    (routePath: string = activeTabRoutePath) => {
      const index = keepAliveTabs.findIndex((o) => o.routePath === routePath);
      if (keepAliveTabs[index].routePath === activeTabRoutePath) {
        if (index > 0) {
          history.push(keepAliveTabs[index - 1].routePath);
        } else {
          history.push(keepAliveTabs[index + 1].routePath);
        }
      }
      delete keepAliveHiddenEvents.current[routePath];
      delete keepAliveShowEvents.current[routePath];
      //splice改变原来的数组，删除该元素
      keepAliveTabs.splice(index, 1);
      setKeepAliveTabs([...keepAliveTabs]);
    },
    [activeTabRoutePath]
  );

  // 关闭其他
  const closeOtherTab = useCallback(
    (routePath: string = activeTabRoutePath) => {
      const toCloseTabs = keepAliveTabs.filter(
        (o) => o.routePath !== routePath
      );
      // 清除被关闭的tab注册的onShow事件和onHidden事件
      toCloseTabs.forEach((tab) => {
        delete keepAliveHiddenEvents.current[tab.routePath];
        delete keepAliveShowEvents.current[tab.routePath];
      });

      setKeepAliveTabs((prev) => prev.filter((o) => o.routePath === routePath));
    },
    [activeTabRoutePath]
  );

  // 刷新tab
  const refreshTab = useCallback(
    (routePath: string = activeTabRoutePath) => {
      setKeepAliveTabs((prev) => {
        const index = prev.findIndex((tab) => tab.routePath === routePath);

        if (index >= 0) {
          // 这个react的特性，key变了，组件会卸载重新渲染
          prev[index].key = getKey();
        }

        delete keepAliveHiddenEvents.current[prev[index].routePath];
        delete keepAliveShowEvents.current[prev[index].routePath];

        return [...prev];
      });
    },
    [activeTabRoutePath]
  );

  useEffect(() => {
    if (!matchRoute) return;
    //已经维护过的tab
    const existKeepAliveTab = keepAliveTabs?.find(
      (o) =>
        o.routePath === matchRoute?.routePath
    );
    setActiveTabRoutePath(matchRoute.routePath);

    const key = getKey();
    //如果不存在则插入
    if (!existKeepAliveTab) {
      setKeepAliveTabs((prev) => [
        ...prev,
        {
          title: matchRoute.title,
          key,
          routePath: matchRoute.routePath,
          pathname: matchRoute.pathname,
          children: matchRoute.children,
          icon: matchRoute.icon,
          isMicroApp: !!matchRoute.isMicroApp,
        },
      ]);
    } else if (existKeepAliveTab.pathname !== matchRoute.pathname) {
      // 如果是同一个路由，但是参数不同，我们只需要刷新当前页签并且把pathname设置为新的pathname， children设置为新的children
      setKeepAliveTabs((prev) => {
        const index = prev.findIndex(
          (tab) => tab.routePath === matchRoute.routePath
        );
        if (index > -1) {
          prev[index].key = key;
          prev[index].pathname = matchRoute.pathname;
          prev[index].children = matchRoute.children;
        }

        delete keepAliveHiddenEvents.current[prev[index].routePath];
        delete keepAliveShowEvents.current[prev[index].routePath];

        return [...prev];
      });
    } else {
      //如果存在，触发组件的onShow的回调
      (keepAliveShowEvents.current[existKeepAliveTab.routePath] || []).forEach(
        (cb) => {
          cb();
        }
      );
    }
    //路由改变，执行上一个tab的onHidden事件
    (keepAliveHiddenEvents.current[activeTabRoutePath] || []).forEach((cb) => {
      cb();
    });
  }, [matchRoute]);

  return {
    keepAliveTabs,
    activeTabRoutePath,
    closeTab,
    refreshTab,
    closeOtherTab,
    onShow,
    onHidden,
    /** 过滤微应用的列表 */
    microAppTabs: keepAliveTabs?.filter(tab => !!tab.isMicroApp),
  };
};

export default useKeepAliveTabs;
