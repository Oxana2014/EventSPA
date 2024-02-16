import Suspense from "react";
import { useLoaderData, json, defer, Await } from "react-router-dom";

import EventsList from "../components/EventsList";

function EventsPage() {
  const { events } = useLoaderData();

  console.log(events);

  return (
    <Suspense fallback={<p>'Loading...'</p>}>
      <Await resolve={events}>
        {/* //this function will be executed by react when data is ready*/}
        {loadedEvents => {
            console.log(loadedEvents)
          return <EventsList events={loadedEvents} />
        }
          }
      </Await>
    </Suspense>
  );
  //);
}

export default EventsPage;

async function loadEvents() {
  //you can use in this function any browser features (cookies, localStorage ... )
  // but you can not use hooks, because it is not inside of component
  const response = await fetch("http://localhost:8080/events");

  if (!response.ok) {
    //  return {isError: true, message: 'Could not fetch events'}
    // throw { message: "Could not fetch events" };
    // throw new Response(JSON.stringify({ message: "Could not fetch events" }), {
    //   status: 500,
    // });
    throw json({ message: "Could not fetch events" }, { status: 500 }); //more convenient way
  } else {
    // const resData = await response.json();
    // return resData.events
    //  const res = new Response('your data', {status: 201})
    // return response;
    //if we use defer():
    const resData = await response.json();
    console.log(resData);
    return resData.events;
  }
}

export function loader() {
  return defer({
    events: loadEvents(),
  });
}
