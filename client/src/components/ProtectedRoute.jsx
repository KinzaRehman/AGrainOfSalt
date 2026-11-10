// Checks the login cookie with the server before showing pages that require an account.
import { useState, useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { getCurrentUser } from '../api/authApi';

function ProtectedRoute() {
  const [status, setStatus] = useState('loading');

  // Run the session check when this component mounts, not on every render.
  useEffect(() => {
    getCurrentUser()
      .then(response => {
        setStatus(response.ok ? 'authenticated' : 'unauthenticated');
      })
      .catch(() => setStatus('unauthenticated'));
  }, []);

  // Wait for the session response so member content is not shown before the check finishes.
  if (status === 'loading') {
    return <p>Loading...</p>;
  }

  // Replace this history entry so Back does not keep returning to the rejected route.
  if (status === 'unauthenticated') {
    return <Navigate to="/login" replace />;
  }

  // Outlet renders the requested protected page, such as Dashboard.
  return <Outlet />;
}

export default ProtectedRoute;