import {Suspense} from 'react'
import { useRouteLoaderData, json, redirect, defer, Await } from "react-router-dom";
import EventItem from "../components/EventItem";
import EventsList from "../components/EventsList";

export default function EventDetailPage() {
  //   const params = useParams(); what is in browser
  const {event, events} = useRouteLoaderData('event-detail');
  return <>
  <Suspense fallback={<p>Loading...</p>}>
  <Await resolve={event}>
    {loadedEvent => <EventItem event={loadedEvent} />}
  </Await>
   </Suspense>
   <Suspense fallback={<p>Loading...</p>}>
   <Await resolve={events}>
    {loadedEvents => <EventsList events={loadedEvents} /> }
   </Await>
   </Suspense>
  </>
}

async function loadEvent(id) {
   
    const response = await fetch("http://localhost:8080/events/" + id); // you may return immediately, react router will await for the promise resolves
    if (!response.ok) {
      throw json(
        { message: "Could not fetch detail for selected event" },
        { status: 500 }
      );
    } else {
    // return response;
    const resData = await response.json();
    console.log(resData);
    return resData.event;
    }
}

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

export async function loader({ request, params }) {
    const id = params.id;

    return defer({
event: await loadEvent(id),
events: loadEvents()
    } )
}

export async function action({request, params}) {
    const eventId = params.id
   const response = await fetch('http://localhost:8080/events/' + eventId, {
    method: request.method
  })
   if (!response.ok) {
    throw json(
      { message: "Could not delete event" },
      { status: 500 }
    );
  } else {
    return redirect('/events');
  }

}
