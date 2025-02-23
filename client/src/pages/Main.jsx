import React, { useState } from 'react';
import Login from './Login';
import Home from './Home';
import BucketList from '../components/BucketList';
import Todo from '../components/Todo';

function Main() {
  const [isLogin, setIsLogin] = useState(false);
  // isLogin 은 나중에 redux 로 받은 isLogin값을 받아 화면을 보여줄 예정
  // return <div>{isLogin ? <Home /> : <Login setIsLogin={setIsLogin} />}</div>;
  return (
    <div>
      <BucketList />
    </div>
  );
}

export default Main;
