import { useNavigate } from 'react-router-dom';
import { logoutUser } from '../api/authApi';

function Dashboard() {
  const navigate = useNavigate();

  async function handleLogout() {
    try {
      const response = await logoutUser();

      if (!response.ok) {
        alert('Logout failed. Please try again.');
        return;
      }

      navigate('/login', { replace: true });
    } catch (error) {
      alert('Cannot connect to the server.');
    }
  }

  return (
    <main>
      <h1>My Dashboard</h1>
      <p>You're logged in!</p>

      <button onClick={handleLogout}>
        Log out
      </button>
    </main>
  );
}

export default Dashboard;