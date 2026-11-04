import { Link } from 'react-router-dom';

function Questionnaire() {
  return (
    <main>
      <h1>Why are you starting?</h1>
      <p>Your motivation questionnaire will go here.</p>
      <Link to="/dashboard">Continue</Link>
    </main>
  );
}

export default Questionnaire;