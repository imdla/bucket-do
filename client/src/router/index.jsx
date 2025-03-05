import { createBrowserRouter, Navigate } from 'react-router-dom';
import MainLayout from '../Layout/MainLayout';
import Home from '../pages/Home';
import Main from '../pages/Main';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import NotFound from '../pages/NotFound';
import KakaoLoginRedirect from '../components/KakaoLoginRedirect ';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Main />,
      },
      {
        path: '/home',
        element: <Home />,
      },
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/signup',
        element: <Signup />,
      },
      {
        path: '/redirect', // 카카오 로그인 후 리디렉션되는 URL
        element: <KakaoLoginRedirect />,
      },
      {
        path: '/notfound',
        element: <NotFound />,
      },
      {
        path: '*',
        element: <Navigate to="/notfound" replace />,
      },
    ],
  },
]);

export default router;
