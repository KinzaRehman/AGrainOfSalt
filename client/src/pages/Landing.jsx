// Introduces the app before someone signs up. It explains the planned features and makes clear what is still being built.
import { Link } from 'react-router-dom';
import focusMark from '../assets/focus-mark.svg';

// Keeping these steps together makes the explanation and order easy to update.
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
          <p className="landing-eyebrow">Locked In</p>
          <h1 id="landing-title">Lock in. <span>Show up for yourself.</span></h1>
          <p className="landing-intro">Pick a challenge, track your progress, and get encouragement from the community to keep you going. Sign up for challenges, commit to your goals, and build habits that help you grow.</p>
          <div className="landing-actions">
            <Link className="landing-button" to="/signup">Sign up</Link>
            <a className="landing-text-link" href="#how-it-works">How it works</a>
          </div>
          <p className="landing-returning">Already have an account? <Link to="/login">Log in</Link></p>
        </div>
        <aside className="landing-note" aria-labelledby="commitment-title">
          <img className="landing-focus-mark" src={focusMark} width="192" height="192" alt="A person leaning forward in a blue chair, ready to focus" />
          <h2 id="commitment-title">What does it mean to lock in?</h2>
          <p>Choose a challenge, commit to doing the work, and take it one day at a time. Your community is here to encourage you as you work on yourself.</p>
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

      {/* Set expectations before signup because the member features are still placeholders. */}
      <section className="landing-expectations landing-section" aria-labelledby="expect-title">
        <div>
          <p className="landing-eyebrow">Before you join</p>
          <h2 id="expect-title">Is this for you?</h2>
          <p>If you like working toward a specific goal and having other people hold you to it, that’s what this app is being built for.</p>
        </div>
        <div className="landing-expectation-details">
          <h3>What we’re building</h3>
          <p>Challenge selection, progress stats, a community leaderboard, and an inbox for encouragement that helps keep you motivated.</p>

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
