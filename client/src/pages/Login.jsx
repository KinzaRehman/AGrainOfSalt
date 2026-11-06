// Collects email and password, asks the server to log in, and opens the dashboard on success.
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { loginUser } from '../api/authApi';

function Login() {
  const navigate = useNavigate();

  // State keeps the form values and messages between renders.
  const [form, setForm] = useState({
    email: '',
    password: ''
  });

  const [error, setError] = useState('');
  const [pending, setPending] = useState(false);

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  }

  // Prevent the normal form reload, then send the request and handle its result.
  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    // Disable the submit button while the request is running.
    setPending(true);

    try {
      const response = await loginUser(form);
      const data = await response.json();

      if (!response.ok) {
        setError(data.message || 'Unable to sign in. Please try again.');
        return;
      }

      navigate('/dashboard');
    } catch {
      setError('Cannot connect to the server. Make sure the API server is running.');
    } finally {
      setPending(false);
    }
  }

  return (
    <main className="auth">
      <h1>Welcome back</h1>

      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          name="email"
          autoComplete="email"
          value={form.email}
          onChange={handleChange}
          required
        />

        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          name="password"
          autoComplete="current-password"
          value={form.password}
          onChange={handleChange}
          required
        />

        {error && <p role="alert">{error}</p>}

        <button disabled={pending} type="submit">{pending ? 'Please wait…' : 'Log in'}</button>
      </form>

      <p><Link to="/forgot-password">Forgot your password?</Link></p>
      <p>
        No account? <Link to="/signup">Sign up</Link>
      </p>
    </main>
  );
}

export default Login;