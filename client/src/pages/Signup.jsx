// Creates an account and sends the newly signed-in user to the questionnaire.
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { signupUser } from '../api/authApi';

function Signup() {
  const navigate = useNavigate();

  // State keeps the form values and messages between renders.
  const [form, setForm] = useState({
    username: '',
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
      const response = await signupUser(form);
      const data = await response.json();

      if (!response.ok) {
        setError(data.message || 'Unable to sign in. Please try again.');
        return;
      }

      navigate('/questionnaire');
    } catch {
      setError('Cannot connect to the server. Make sure the API server is running.');
    } finally {
      setPending(false);
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
          autoComplete="new-password"
          value={form.password}
          onChange={handleChange}
          minLength="8"
          maxLength="72"
          required
        />

        {error && <p role="alert">{error}</p>}

        <button disabled={pending} type="submit">{pending ? 'Please wait…' : 'Sign up'}</button>
      </form>

      <p>
        Already have an account? <Link to="/login">Log in</Link>
      </p>
    </main>
  );
}

export default Signup;