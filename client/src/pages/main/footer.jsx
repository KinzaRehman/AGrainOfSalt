// Gives every page the same brand and account links, including a way to recover access without logging in.
import { Link } from 'react-router-dom';
import Brand from '../../components/Brand';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer-inner">
        <div className="site-footer-top">
          <div className="site-footer-brand">
            <Brand />
            <p>Challenges, progress, and community accountability.</p>
          </div>
          <nav className="site-footer-nav" aria-label="Footer navigation">
            <Link to="/">Home</Link>
            <Link to="/signup">Sign up</Link>
            <Link to="/login">Log in</Link>
            <Link to="/forgot-password">Account recovery</Link>
          </nav>
        </div>
        {/* Use the browser year so the copyright does not need a yearly edit. */}
        <div className="site-footer-bottom">
          <small>© {new Date().getFullYear()} A Grain of Salt.</small>
        </div>
      </div>
    </footer>
  );
}
