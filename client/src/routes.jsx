
import { createBrowserRouter, Navigate } from 'react-router-dom';
import AppLayout from './components/AppLayout';
import LoginForm from './pages/LoginForm';
import RegistrationForm from './pages/RegistrationForm';
import LandingPage from './pages/LandingPage';
import Journal from './pages/Journal';
import Resources from './pages/Resources';
import Community from './pages/Community';

// Simple auth check
const isLoggedIn = () => localStorage.getItem('token') !== null;

// Wrapper for protected routes
const Protected = ({ children }) => {
  return isLoggedIn() ? children : <Navigate to="/login" replace />;
};

const router = createBrowserRouter([
  { path: '/login', element: <LoginForm /> },
  { path: '/register', element: <RegistrationForm /> },
  {
    path: '/',
    element: <Navigate to="/dashboard" replace />,
  },
  {
    path: '/dashboard',
    element: (
      <Protected>
        <AppLayout>
          <LandingPage />
        </AppLayout>
      </Protected>
    ),
  },
  {
    path: '/journal',
    element: (
      <Protected>
        <AppLayout>
          <Journal />
        </AppLayout>
      </Protected>
    ),
  },
  {
    path: '/resources',
    element: (
      <Protected>
        <AppLayout>
          <Resources />
        </AppLayout>
      </Protected>
    ),
  },
  {
    path: '/community',
    element: (
      <Protected>
        <AppLayout>
          <Community />
        </AppLayout>
      </Protected>
    ),
  },
  {
    path: '*',
    element: <Navigate to="/dashboard" replace />,
  },
]);

export default router;
