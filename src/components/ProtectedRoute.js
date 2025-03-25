'use client';
import { useAuth } from '../components/breadcrumbs/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/'); // Redirect to home if not authenticated
    }
  }, [user, loading, router]);

  if (loading) return <div>Loading...</div>; // Show loading while checking auth

  return user ? children : null;
};

export default ProtectedRoute;
