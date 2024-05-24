import { Button } from 'antd';
import { useEffect, useRef, useState } from 'react';
import KeepAlive from 'react-activation';
import {
  Link,
  Outlet,
  MicroApp,
  useLocation,
  MicroAppWithMemoHistory,
} from 'umi';

const APP1 = () => {
  const location = useLocation();
  const pathList = location.pathname.split('/');

  // const [url, setUrl] = useState('');

  // useEffect(() => {
  //   if (location.pathname !== '/app-1') {
  //     setUrl(location.pathname);
  //   } else {
  //     setUrl('/');
  //   }
  //   return () => {
  //     setUrl('/');
  //     console.log('APP1.location', location, url);
  //   }
  // }, []);

  // if (!url) return null;

  return (
    <KeepAlive>
      <MicroAppWithMemoHistory
        name='app-1'
        url='/app-1'
        // pathname={location.pathname}
      />
      {/* <MicroApp name='app-1' base='/app-1' /> */}
    </KeepAlive>
  );
};

export default APP1;
