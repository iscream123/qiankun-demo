import { Link, Outlet, useLocation } from 'umi';
import styles from './index.less';
import { useEffect } from 'react';

export default function Layout() {
  // console.log('window.__POWERED_BY_QIANKUN__', window.__POWERED_BY_QIANKUN__);

  // useEffect(() => {
  //   console.log('app1 mount');

  //   return () => {
  //     console.log('app1 unmount');
  //   };
  // }, []);

  const location = useLocation();


  return (
    <div className={styles.navs}>
      <ul>
        <li>
          <Link to='/'>Home</Link>
        </li>
        <li>
          <Link to='/docs'>Docs</Link>
          {/* <a
            onClick={() => {
              window.history.pushState('', '', '/app-1/docs');
              // location.href = '/app-1/docs'
            }}
          >
            Docs
          </a> */}
        </li>
        <li>
          <Link to={`/detail/${Math.random()}`}>Detail</Link>
        </li>
      </ul>
      <Outlet />
    </div>
  );
}
