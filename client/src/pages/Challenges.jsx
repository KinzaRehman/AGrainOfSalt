// Reserves space for choosing a challenge. The next link leads to the dashboard, but does not save a selection yet.
import PageOutline from '../components/PageOutline';

export default function Challenges() {
  return <PageOutline title="Challenge selection" sections={['Available challenges', 'Selected challenge']} next={{ to: '/dashboard', label: 'Continue to challenge KPIs' }} />;
}
