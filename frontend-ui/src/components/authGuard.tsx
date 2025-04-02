'use client';

import React from 'react';
import { useAuth } from '../context/authContext';
import LoginForm from './loginForm';

interface AuthGuardProps {
  children: React.ReactNode;
}

export default function AuthGuard({ children }: AuthGuardProps) {
  const { isLoggedIn, loading } = useAuth();
  
  if (loading) {
    return <div className="text-center py-8">Loading...</div>;
  }
  
  if (!isLoggedIn) {
    return <LoginForm />;
  }
  
  return <>{children}</>;
}