import { useEffect, useState } from 'react';

// Light/dark switch shown in the site header. The choice is saved in the browser,
// and index.html applies it before React loads so the page never flashes the wrong theme.
const STORAGE_KEY = 'grain-theme';

// Read the theme already applied by index.html so the switch starts in the right position.
function readTheme() {
  return document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
}

export default function ThemeToggle() {
  const [theme, setTheme] = useState(readTheme);

  // index.css reads data-theme on the <html> element to pick the light or dark colors.
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // Update the page now and remember the choice for the next visit.
  function handleToggle() {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // Saving can fail in private windows; the theme still changes for this visit.
    }
  }

  // Switch semantics let screen readers announce whether dark mode is on or off.
  return (
    <button
      type="button"
      className="theme-toggle"
      role="switch"
      aria-checked={theme === 'dark'}
      onClick={handleToggle}
    >
      <span className="theme-toggle-track" aria-hidden="true">
        <span className="theme-toggle-thumb" />
      </span>
      Dark mode
    </button>
  );
}
