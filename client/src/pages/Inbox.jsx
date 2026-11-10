// Sets out the message list and detail areas. These will hold the grains of salt received from other members.
import PageOutline from '../components/PageOutline';

export default function Inbox() {
  return <PageOutline title="Grains of salt" sections={['Received messages', 'Message details']} />;
}
