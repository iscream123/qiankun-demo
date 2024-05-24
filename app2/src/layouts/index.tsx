import { Link, Outlet } from 'umi';
import styles from './index.less';
import KeepAlive, { AliveScope } from 'react-activation';

export default function Layout() {
  // console.log('window.__POWERED_BY_QIANKUN__', window.__POWERED_BY_QIANKUN__);
  return (
    <AliveScope>
      <div className={styles.navs}>
        <ul>
          <li>
            <Link to='/'>Home</Link>
          </li>
          <li>
            <Link to='/docs'>Docs</Link>
          </li>
          <li>
            <a href='https://github.com/umijs/umi'>Github</a>
          </li>
        </ul>
        <KeepAlive>
          <Outlet />
        </KeepAlive>
      </div>
    </AliveScope>
  );
}
