import { Link } from 'react-router-dom';

const writtenQuestions = [
  {
    name: 'goal',
    title: 'What are you locking in for?',
    help: "What's one goal you want to achieve or habit you want to build?",
  },
  {
    name: 'motivation',
    title: "What's motivating you to make this change?",
    help: 'Why does this goal matter to you right now?',
  },
  {
    name: 'obstacle',
    title: "What's your biggest obstacle to staying consistent?",
    help: 'Motivation, time, distractions, procrastination, or something else?',
  },
  {
    name: 'action',
    title: 'What does showing up for yourself look like?',
    help: "What's one small, measurable action you can take to make progress?",
  },
];

function WrittenQuestion({ question, number }) {
  return (
    <li className="questionnaire-question">
      <label htmlFor={question.name}>{number}. {question.title}</label>
      <p id={`${question.name}-help`}>{question.help}</p>
      <textarea id={question.name} name={question.name} rows={3} aria-describedby={`${question.name}-help`} />
    </li>
  );
}

function Questionnaire() {
  return (
    <main className="questionnaire">
      <h1>5 questions to help you Lock In</h1>
      <p>Take a moment to think about your goals and what you can commit to.</p>
      <p className="questionnaire-note">Use these questions to reflect.</p>
      <ol className="questionnaire-questions">
        {writtenQuestions.slice(0, 2).map((question, index) => (
          <WrittenQuestion skey={question.name} question={question} number={index + 1} />
        ))}
        <li className="questionnaire-question">
          <label htmlFor="commitment-days">3. How many days a week can you realistically commit?</label>
          <p id="commitment-days-help">Choose 1–7 days. Consistency matters more than perfection.</p>
          <select id="commitment-days" name="commitmentDays" defaultValue="" aria-describedby="commitment-days-help">
            <option value="" disabled>Choose days per week</option>
            {[1, 2, 3, 4, 5, 6, 7].map(days => (
              <option key={days} value={days}>{days} {days === 1 ? 'day' : 'days'}</option>
            ))}
          </select>
        </li>
        {writtenQuestions.slice(2).map((question, index) => (
          <WrittenQuestion key={question.name} question={question} number={index + 4} />
        ))}
      </ol>
      <Link to="/dashboard">Continue</Link>
    </main>
  );
}

export default Questionnaire;
