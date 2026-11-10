// Sets out the filter and rankings areas for comparing challenge progress. Rankings are not connected yet.
import PageOutline from '../components/PageOutline';

export default function Leaderboard() {
  return <PageOutline title="Leaderboard" sections={['Challenge filter', 'Rankings']} />;
}
