import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { loginUser } from '../api/authApi';

function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: '',
    password: ''
  });

  const [error, setError] = useState('');

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');

    try {
      const response = await loginUser(form);
      const data = await response.json();

      if (!response.ok) {
        setError(data.message);
        return;
      }

      navigate('/dashboard');
    } catch (error) {
      setError('Cannot connect to the server.');
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
          value={form.email}
          onChange={handleChange}
          required
        />

        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          required
        />

        {error && <p role="alert">{error}</p>}

        <button type="submit">Log in</button>
      </form>

      <p>
        No account? <Link to="/signup">Sign up</Link>
      </p>
    </main>
  );
}

export default Login;