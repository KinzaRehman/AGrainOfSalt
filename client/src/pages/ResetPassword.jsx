// Uses the token from the reset link to save a new password after both entries match.
import { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { resetPassword } from '../api/authApi';

export default function ResetPassword() {
  // State keeps the form values and messages between renders.
  const [params] = useSearchParams();
  // The URL must include ?token=... from the reset link; a bare page URL cannot reset an account.
  const token = params.get('token') || '';
  const [password, setPassword] = useState('');
  const [confirmation, setConfirmation] = useState('');
  const [pending, setPending] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const validToken = /^[a-f0-9]{64}$/.test(token);

  
  // Prevent the normal form reload, then send the request and handle its result.
  async function handleSubmit(event) {
    event.preventDefault();
    setError('');
    if (password !== confirmation) {
      setError('Passwords do not match.');
      return;
    }
    // Disable the submit button while the request is running.
    setPending(true);
    try {
      const response = await resetPassword({ token, password });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Unable to reset password.');
      setMessage(data.message);
      setPassword('');
      setConfirmation('');
    } catch (error) {
      setError(error instanceof TypeError ? 'Cannot connect to the server. Please try again.' : error.message);
    } finally {
      setPending(false);
    }
  }

  return (
    <main className="auth">
      <h1>Reset your password</h1>
      {!validToken ? <p role="alert">This link is missing a valid reset token.</p> : message ? <p role="status">{message}</p> : (
        <form onSubmit={handleSubmit}>
          <p>Use at least 8 characters. Passwords are case-sensitive.</p>
          <label htmlFor="password">New password</label>
          <input id="password" type="password" autoComplete="new-password" minLength={8} maxLength={72} value={password} onChange={event => setPassword(event.target.value)} required />
          <label htmlFor="confirmation">Confirm new password</label>
          <input id="confirmation" type="password" autoComplete="new-password" minLength={8} maxLength={72} value={confirmation} onChange={event => setConfirmation(event.target.value)} required />
          {error && <p role="alert">{error}</p>}
          <button disabled={pending} type="submit">{pending ? 'Saving…' : 'Save new password'}</button>
        </form>
      )}
      {!message && <p><Link to="/forgot-password">Request a new reset link</Link></p>}
      <p><Link to="/login">Back to login</Link></p>
    </main>
  );
}
