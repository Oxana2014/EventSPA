 import { useLoaderData } from 'react-router-dom';

import EventsList from '../components/EventsList';

function EventsPage() {
  const data = useLoaderData()
  const events = data.events

  return (
    <>
       <EventsList events={events} />
    {/* //   <EventsList /> */}
    </>
  );
}

export default EventsPage;

export async function loader() {

    //you can use in this function any browser features (cookies, localStorage ... )
    // but you can not use hooks, because it is not inside of component
    const response = await fetch('http://localhost:8080/events');

    if (!response.ok) {
    //...
    } else {
     // const resData = await response.json();
     // return resData.events
   //  const res = new Response('your data', {status: 201})
     return response
    }
}
