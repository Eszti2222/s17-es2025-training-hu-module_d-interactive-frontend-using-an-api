import { useParams } from "react-router";

function CourseDetailsPage() {
  const { id } = useParams();

  return (
    <div>
      <h2>Kurzus részletek</h2>
      <p>Kurzus ID: {id}</p>
    </div>
  );
}

export default CourseDetailsPage;
