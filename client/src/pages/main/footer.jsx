// Shared footer with account links and a copyright year taken from the browser clock.
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div>
        <Link className="site-brand" to="/">A Grain of Salt</Link>
      </div>
      <nav aria-label="Footer navigation">
        <Link to="/signup">Sign up</Link>
        <Link to="/login">Log in</Link>
        <Link to="/forgot-password">Account recovery</Link>
      </nav>
      <small>© {new Date().getFullYear()} A Grain of Salt.</small>
    </footer>
  );
}
