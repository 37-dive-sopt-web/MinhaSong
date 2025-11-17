import { createBrowserRouter } from 'react-router';
import { Home, Login, Signup, Mypage, Members } from '../pages/index';

const router = createBrowserRouter([
  {
    path: '/',
    Component: Home,
  },
  {
    path: '/login',
    Component: Login,
  },
  {
    path: '/signup',
    Component: Signup,
  },
  {
    path: '/mypage',
    Component: Mypage,
  },
  {
    path: '/members',
    Component: Members,
  }
]);

export default router;