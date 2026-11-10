import { Link } from 'react-router-dom';

const steps = [
  { title: 'Find your reason', description: 'Decide what you want to work on and why you want to do it.' },
  { title: 'Pick a challenge', description: 'Choose a challenge that fits your goal and follow your progress.' },
  { title: 'Check in', description: 'Log your effort and see how others are doing with their challenges.' },
];

export default function Landing() {
  return (
    <main className="landing">
      <section className="landing-hero" aria-labelledby="landing-title">
        <div>
          <p className="landing-eyebrow">A Grain of Salt</p>
          <h1 id="landing-title">A little help <span>sticking to your goals.</span></h1>
          <p className="landing-intro">Pick a challenge, track your progress, and get a little salt from the community to keep you going. A Grain of Salt gives you a place to check in on the goals you set for yourself.</p>
          <div className="landing-actions">
            <Link className="landing-button" to="/signup">Sign up</Link>
            <a className="landing-text-link" href="#how-it-works">How it works</a>
          </div>
          <p className="landing-returning">Already have an account? <Link to="/login">Log in</Link></p>
        </div>
        <aside className="landing-note" aria-labelledby="salt-title">
          <h2 id="salt-title">Why “a grain of salt”?</h2>
          <p>The “salt” is the community side of the app: messages from other members to help you stay accountable to your challenge.</p>
        </aside>
      </section>

      <section id="how-it-works" className="landing-section" aria-labelledby="how-title">
        <h2 id="how-title">How it works</h2>
        <ol className="landing-steps">
          {steps.map((step, index) => (
            <li key={step.title}>
              <span className="landing-step-number" aria-hidden="true">0{index + 1}</span>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="landing-expectations landing-section" aria-labelledby="expect-title">
        <div>
          <p className="landing-eyebrow">Before you join</p>
          <h2 id="expect-title">Is this for you?</h2>
          <p>If you like working toward a specific goal and having other people hold you to it, that’s what this app is being built for.</p>
        </div>
        <div className="landing-expectation-details">
          <h3>What we’re building</h3>
          <p>Challenge selection, progress stats, a community leaderboard, and an inbox for the “grains of salt” that help keep you motivated.</p>
          <h3>Still in development</h3>
          <p>You can sign up and log in now. The questionnaire, challenges, progress tracking, leaderboard, and inbox are not ready to use yet.</p>
        </div>
      </section>

      <section className="landing-closing" aria-labelledby="start-title">
        <h2 id="start-title">Want to join?</h2>
        <p>Create an account to get started.</p>
        <Link className="landing-button" to="/signup">Sign up</Link>
      </section>
    </main>
  );
}
