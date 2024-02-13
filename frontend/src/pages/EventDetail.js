import { useParams } from "react-router-dom";

export default function EventDetailPage() {
  const params = useParams();
  return (
    <>
      <h1>Event Details</h1>
      <p>{params.id}</p>
    </>
  );
}
