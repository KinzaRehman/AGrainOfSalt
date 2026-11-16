// Sets out the message list and detail areas. These will hold the encouragement received from other members.
import PageOutline from '../components/PageOutline';

export default function Inbox() {
  return <PageOutline title="Encouragement" sections={['Received messages', 'Message details']} />;
}
