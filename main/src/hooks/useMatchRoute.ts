import { useEffect, useState } from 'react';
import {
  useSelectedRoutes,
  useAppData,
  useLocation,
  IRoute,
  history,
} from 'umi';

interface MatchRouteType {
  title: string;
  //实际路径
  pathname: string; //  /user/1
  children?: any;
  //匹配动态参数的路由
  routePath: string; // /user/:id
  icon?: any;
  //是否是微应用
  isMicroApp?: boolean;
}

type CustomIRoute = IRoute & {
  name: string;
};

const useMatchRoute = () => {
  // 用于读取当前路径命中的所有路由信息
  const selectedRoutes = useSelectedRoutes();
  // useAppData 返回全局的应用数据, 获取所有路由
  const { routes } = useAppData();
  // 获取当前url
  const { pathname } = useLocation();

  const [matchRoute, setMatchRoute] = useState<MatchRouteType | undefined>();

  // 处理菜单名称
  const getMenuTitle = (lastRoute: any) => {
    let curRoute = lastRoute.route;
    let names = [];

    while (curRoute.parentId && !curRoute.isLayout) {
      if ((routes[curRoute.parentId] as CustomIRoute).name) {
        names.push((routes[curRoute.parentId] as CustomIRoute).name);
      } else {
        break;
      }
      curRoute = routes[curRoute.parentId];
    }

    names.push(lastRoute.route.name);

    return names.join('.');
  };

  // 监听pathname变了，说明路由有变化，重新匹配，返回新路由信息
  useEffect(() => {
    // 获取当前匹配的路由
    const lastRoute = selectedRoutes.at(-1);

    if (!lastRoute?.route?.path) return;

    const routeDetail = routes[(lastRoute.route as any).id];

    // 如果匹配的路由需要重定向，这里直接重定向
    if (routeDetail?.redirect) {
      history.replace(routeDetail?.redirect);
      return;
    }

    // 获取菜单名称
    const title = getMenuTitle(lastRoute);

    setMatchRoute({
      title,
      pathname,
      // children,
      routePath: lastRoute.route.path,
      icon: (lastRoute.route as any).icon, // icon是拓展出来的字段
      isMicroApp: !!(lastRoute?.route as any)?.isMicroApp,
    });
  }, [pathname]);

  return matchRoute;
};

export default useMatchRoute;
