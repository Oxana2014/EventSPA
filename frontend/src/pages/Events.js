import { useLoaderData } from "react-router-dom";

import EventsList from "../components/EventsList";

function EventsPage() {
  const data = useLoaderData();
  if (data.isError) {
    return <p>{data.message}</p>;
  }
  const events = data.events;

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
  const response = await fetch("http://localhost:8080/events");

  if (!response.ok) {
    //  return {isError: true, message: 'Could not fetch events'}
    // throw { message: "Could not fetch events" };
    throw new Response(JSON.stringify({ message: "Could not fetch events" }), {
      status: 500,
    });
  } else {
    // const resData = await response.json();
    // return resData.events
    //  const res = new Response('your data', {status: 201})
    return response;
  }
}
