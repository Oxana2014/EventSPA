import {Link} from 'react-router-dom' 

const EVENTS = [
  { id: "e1", title: "Event 1" },
  { id: "e2", title: "Event 2" },
  { id: "e3", title: "Event 3" },
  { id: "e4", title: "Event 4" },
];

export default function EventsPage() {
  return (
    <>
      <h1>Events</h1>
      <ul>
     { EVENTS.map(ev => <li key={ev.id}><Link to={ev.id}><p>{ev.title}</p></Link></li>)}
     </ul>
    </>
  );
}
