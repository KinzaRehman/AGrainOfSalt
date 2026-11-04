import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { signupUser } from '../api/authApi';

function Signup() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: '',
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
      const response = await signupUser(form);
      const data = await response.json();

      if (!response.ok) {
        setError(data.message);
        return;
      }

      navigate('/questionnaire');
    } catch (error) {
      setError('Cannot connect to the server.');
    }
  }

  return (
    <main className="auth">
      <h1>A Grain of Salt</h1>
      <h2>Create your account</h2>

      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username</label>
        <input
          id="username"
          name="username"
          value={form.username}
          onChange={handleChange}
          required
        />

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
          minLength="8"
          maxLength="72"
          required
        />

        {error && <p role="alert">{error}</p>}

        <button type="submit">Sign up</button>
      </form>

      <p>
        Already have an account? <Link to="/login">Log in</Link>
      </p>
    </main>
  );
}

export default Signup;