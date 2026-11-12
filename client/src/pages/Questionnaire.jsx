// Placeholder for onboarding questions. The Continue link currently opens the dashboard without saving answers.
import { Link } from 'react-router-dom';

function Questionnaire() {
  return (
    <main>
      <h1>Why are you starting?</h1>
      <p></p>
      <Link to="/dashboard">Continue</Link>
      
the 5 main questions to ask a user when they first sign up for a new app or service are:
1. What is your primary goal for using this app/service?
2. How often do you plan to use this app/service?
3. What features are most important to you?
4. Do you have any previous experience with similar apps/services?
5. What challenges or problems are you hoping this app/service will help you solve?
    </main>
  );
}

export default Questionnaire;