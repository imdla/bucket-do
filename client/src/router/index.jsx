import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '../Layout/MainLayout';
import Home from '../pages/Home';
import Main from '../pages/Main';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
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
    ],
  },
]);

export default router;
