import { useRouteLoaderData, json, redirect } from "react-router-dom";
import EventItem from "../components/EventItem";

export default function EventDetailPage() {
  //   const params = useParams(); what is in browser
  const data = useRouteLoaderData('event-detail');
  return <EventItem event={data.event} />;
}

export async function loader({ request, params }) {
  const id = params.id;
  const response = await fetch("http://localhost:8080/events/" + id); // you may return immediately, react router will await for the promise resolves
  if (!response.ok) {
    throw json(
      { message: "Could not fetch detail for selected event" },
      { status: 500 }
    );
  } else {
    return response;
  }
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
