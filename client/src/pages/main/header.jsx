// Shared site title and navigation. React Router links move between pages without a full reload.
import { Link, NavLink } from 'react-router-dom';
import ThemeToggle from '../../components/ThemeToggle';

export default function Header() {
  return (
    <header className="site-header">
      <div className="site-header-top">
        <Link className="site-brand" to="/" aria-label="A Grain of Salt home">
          <span aria-hidden="true">🧂</span>
          A Grain of Salt
        </Link>
        <ThemeToggle />
      </div>
      <nav aria-label="Main navigation">
        <NavLink to="/login">Log in</NavLink>
        <NavLink className="site-signup" to="/signup">Sign up</NavLink>
      </nav>
    </header>
  );
}
