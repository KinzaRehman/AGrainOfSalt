import PageOutline from '../components/PageOutline';

export default function Challenges() {
  return <PageOutline title="Challenge selection" sections={['Available challenges', 'Selected challenge']} next={{ to: '/dashboard', label: 'Continue to challenge KPIs' }} />;
}
