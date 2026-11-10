// Shared site title and navigation. React Router links move between pages without a full reload.
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
        <div className="site-header-tools"><ThemeToggle /></div>
      </div>
    </header>
  );
}
