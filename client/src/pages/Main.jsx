import React from 'react';
import { useSelector } from 'react-redux';
import Login from './Login';
import Home from './Home';

function Main() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  return <div>{isLoggedIn ? <Home /> : <Login />}</div>;
}

export default Main;
