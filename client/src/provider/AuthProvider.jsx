import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import authApi from '../api/authApi';
import { logout } from '../store/slices/authSlice';

export default function AuthProvider() {
  const dispatch = useDispatch();

  useEffect(() => {
    const verifyToken = async () => {
      try {
        await authApi.verify();
      } catch (error) {
        dispatch(logout());
      }
    };

    verifyToken();
  }, []);

  return <></>;
}
