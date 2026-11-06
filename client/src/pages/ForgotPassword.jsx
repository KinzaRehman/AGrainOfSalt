// Requests a reset link for an email address. This does not change the password yet.
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { forgotPassword } from '../api/authApi';

export default function ForgotPassword() {
  // State keeps the form values and messages between renders.
  const [email, setEmail] = useState('');
  const [pending, setPending] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  // Prevent the normal form reload, then send the request and handle its result.
  async function handleSubmit(event) {
    event.preventDefault();
    // Disable the submit button while the request is running.
    setPending(true);
    setError('');
    setMessage('');
    try {
      const response = await forgotPassword({ email });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Unable to request a reset.');
      setMessage(data.message);
    } catch (error) {
      setError(error instanceof TypeError ? 'Cannot connect to the server. Please try again.' : error.message);
    } finally {
      setPending(false);
    }
  }

  return (
    <main className="auth">
      <h1>Forgot your password?</h1>
      <form onSubmit={handleSubmit}>
        <p>Enter your account email to request a password reset link.</p>
        <label htmlFor="email">Email</label>
        <input id="email" type="email" autoComplete="email" value={email} onChange={event => setEmail(event.target.value)} required />
        {error && <p role="alert">{error}</p>}
        {message && <p role="status">{message}</p>}
        <button disabled={pending} type="submit">{pending ? 'Sending…' : 'Send reset link'}</button>
      </form>
      <p><Link to="/login">Back to login</Link></p>
    </main>
  );
}
