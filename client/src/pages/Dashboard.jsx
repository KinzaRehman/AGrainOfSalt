// Shows the planned challenge summary and progress sections. PageOutline keeps the layout consistent until real stats are connected.
import PageOutline from '../components/PageOutline';

export default function Dashboard() {
  return <PageOutline title="Challenge KPIs" sections={['Current challenge', 'Key performance indicators', 'Progress and check-ins']} />;
}
