import { Link } from 'react-router-dom';

// Labeled empty regions only; page content and behavior will be added later.
export default function PageOutline({ title, sections, next }) {
  return (
    <main className="page-outline">
      <h1>{title}</h1>
      <div className="outline-sections">
        {sections.map(section => (
          <section className="outline-region" key={section} aria-label={section}>
            <h2>{section}</h2>
          </section>
        ))}
      </div>
      {next && <Link className="outline-next" to={next.to}>{next.label}</Link>}
    </main>
  );
}
