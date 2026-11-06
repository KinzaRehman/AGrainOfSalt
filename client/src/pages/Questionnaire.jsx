// Placeholder for onboarding questions. The Continue link currently opens the dashboard without saving answers.
import { Link } from 'react-router-dom';

function Questionnaire() {
  return (
    <main>
      <h1>Why are you starting?</h1>
      <p></p>
      <Link to="/dashboard">Continue</Link>
      

    </main>
  );
}

export default Questionnaire;