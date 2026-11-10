// Shared public header for every page. Brand keeps the logo consistent, and NavLink marks the current page.
import { NavLink } from 'react-router-dom';
import ThemeToggle from '../../components/ThemeToggle';
import Brand from '../../components/Brand';

export default function Header() {
  return (
    <header className="site-header">
      <div className="site-header-inner">
        <Brand />
        <nav className="site-header-nav" aria-label="Main navigation">
          <NavLink to="/" end>Home</NavLink>
          <NavLink to="/login">Log in</NavLink>
          <NavLink className="site-signup" to="/signup">Sign up</NavLink>
        </nav>
        {/* Keep display settings separate from the links used to move between pages. */}
        <div className="site-header-tools"><ThemeToggle /></div>
      </div>
    </header>
  );
}
