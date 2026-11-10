import { Link } from 'react-router-dom';

export default function Brand() {
  return (
    <Link className="site-brand" to="/" aria-label="A Grain of Salt home">
      <img className="site-brand-mark" src="/favicon.svg" width="44" height="44" alt="" />
      <span className="site-wordmark" aria-hidden="true">
        <span className="site-wordmark-prefix">A GRAIN</span>
        <span className="site-wordmark-name">of Salt</span>
      </span>
    </Link>
  );
}
