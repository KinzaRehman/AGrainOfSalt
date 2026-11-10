import { Link } from 'react-router-dom';

// Reuses the same placeholder layout across unfinished member pages. These sections do not load or save data.
export default function PageOutline({ title, sections, next }) {
  return (
    <main className="page-outline">
      <h1>{title}</h1>
      {/* Each page supplies its own section names instead of copying this markup. */}
      <div className="outline-sections">
        {sections.map(section => (
          <section className="outline-region" key={section} aria-label={section}>
            <h2>{section}</h2>
          </section>
        ))}
      </div>
      {/* Only pages with a next destination show a continue link. */}
      {next && <Link className="outline-next" to={next.to}>{next.label}</Link>}
    </main>
  );
}
