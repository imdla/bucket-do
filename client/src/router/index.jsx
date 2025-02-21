import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '../Layout/MainLayout';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
  },
]);

export default router;
