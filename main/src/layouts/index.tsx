import { Link, Outlet, MicroApp, useLocation, history } from 'umi';
import styles from './index.less';
import { useEffect, useMemo } from 'react';
import KeepAlive, { AliveScope } from 'react-activation';
import useKeepAliveTabs from '@/hooks/useKeepAliveTabs';
import { Tabs } from 'antd';

export default function Layout() {
  const { keepAliveTabs, activeTabRoutePath } = useKeepAliveTabs();
  console.log(keepAliveTabs);

  const tabItems = useMemo(() => {
    return keepAliveTabs?.map((tab) => {
      return {
        key: tab.routePath,
        label: tab.title,
      };
    });
  }, [keepAliveTabs]);

  // useEffect(() => {
  //   window.addEventListener('beforeunload', (event) => {
  //     // Cancel the event as stated by the standard.
  //     event.preventDefault();

  //     // Chrome requires returnValue to be set.
  //     event.returnValue = '';

  //   });
  // }, []);

  return (
    <AliveScope>
      <div className={styles.navs}>
        <ul>
          <li>
            <Link to='/app-1'>APP-1</Link>
          </li>
          <li>
            <Link to='/app-2'>APP-2</Link>
          </li>
          <li>
            <Link to='/'>Home</Link>
          </li>
        </ul>
        <Tabs
          items={tabItems}
          activeKey={activeTabRoutePath}
          onChange={(activeKey: string) => {
            const currTab = keepAliveTabs.find(
              (tab) => tab.routePath === activeKey
            );
            if (currTab) history.push(currTab.pathname);
          }}
        />
        <Outlet />

        {/* <KeepAlive id='app-1' cacheKey='app-1' name='app-1'>
          <div>
            {pathname === '/app-1' && <input placeholder='app-1' />}
            <MicroApp name='app-1' base='/app-1' />
          </div>
        </KeepAlive>
        <KeepAlive id='app-2' cacheKey='app-2' name='app-2'>
          <div>
            {pathname === '/app-2' && <input placeholder='app-2' />}
            <MicroApp name='app-2' base='/app-2' />
          </div>
        </KeepAlive> */}

        {/*  */}
      </div>
    </AliveScope>
  );
}
