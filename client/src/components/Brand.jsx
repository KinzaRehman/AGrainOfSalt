// Keeps the logo and home link the same in the header and footer. The icon also matches the browser tab favicon.
import { Link } from 'react-router-dom';

export default function Brand() {
  return (
    <Link className="site-brand" to="/" aria-label="A Grain of Salt home">
      {/* The link already names the brand, so the image and styled text do not need to be read again. */}
      <img className="site-brand-mark" src="/favicon.svg" width="44" height="44" alt="" />
      <span className="site-wordmark" aria-hidden="true">
        <span className="site-wordmark-prefix">A GRAIN</span>
        <span className="site-wordmark-name">of Salt</span>
      </span>
    </Link>
  );
}
