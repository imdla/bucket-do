import { createBrowserRouter, Navigate } from 'react-router-dom';
import MainLayout from '../Layout/MainLayout';
import Home from '../pages/Home';
import Main from '../pages/Main';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import NotFound from '../pages/NotFound';
import ProtectedRoute from '../components/ProtectedRoute';

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
        element: (
          <ProtectedRoute pathname={'/home'}>
            <Home />,
          </ProtectedRoute>
        ),
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
