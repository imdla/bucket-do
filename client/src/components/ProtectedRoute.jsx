import React, { useEffect } from 'react';
import { replace, useLocation, useNavigate } from 'react-router-dom';

export default function ProtectedRoute({ children, pathname }) {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === pathname) {
      navigate('/', replace);
    }
  }, [location, navigate]);

  return children;
}
