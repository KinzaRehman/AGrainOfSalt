import { useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { logoutUser } from '../api/authApi';

// Keeps member navigation in one place so each signed-in page only needs its own content.
export default function MemberLayout() {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [pending, setPending] = useState(false);

  // Wait for the server to clear the session before leaving the member area.
  async function handleLogout() {
    setError('');
    setPending(true);
    try {
      const response = await logoutUser();
      if (!response.ok) {
        setError('Logout failed. Please try again.');
        return;
      }
      navigate('/login', { replace: true });
    } catch {
      setError('Cannot connect to the server.');
    } finally {
      setPending(false);
    }
  }

  return (
    <div className="member-layout">
      <nav className="member-nav" aria-label="Member navigation">
        <NavLink to="/questionnaire">Questionnaire</NavLink>
        <NavLink to="/challenges">Challenge selection</NavLink>
        <NavLink to="/dashboard">Challenge KPIs</NavLink>
        <NavLink to="/leaderboard">Leaderboard</NavLink>
        <NavLink to="/inbox">Grains of salt</NavLink>
        <button onClick={handleLogout} disabled={pending}>{pending ? 'Logging out…' : 'Log out'}</button>
      </nav>
      {error && <p role="alert">{error}</p>}
      {/* React Router puts the selected member page here, below the shared navigation. */}
      <Outlet />
    </div>
  );
}
