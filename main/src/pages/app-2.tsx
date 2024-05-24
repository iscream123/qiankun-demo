import { useState } from 'react';
import KeepAlive from 'react-activation';
import { Link, Outlet, MicroApp, useLocation, MicroAppWithMemoHistory } from 'umi';

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>count: {count}</p>
      <button onClick={() => setCount((count) => count + 1)}>Add</button>
    </div>
  );
}


const APP2 = () => {
  return (
    <KeepAlive>
      {/* <MicroApp name='app-2' base='/app-2' /> */}
      <MicroAppWithMemoHistory name='app-2' base='/' />
      <Counter/>
    </KeepAlive>
  );
};

export default APP2;
