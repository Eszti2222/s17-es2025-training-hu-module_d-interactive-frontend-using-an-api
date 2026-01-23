import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CoursesContext } from "../contexts/CoursesContext";

export default function Course({ course }) {
  const navigate = useNavigate();
  const { enrollCourse } = useContext(CoursesContext);

  function enroll() {
    if (!course.isEnrolled) {
      enrollCourse(course.id);
    }

    navigate(`/courses/${course.id}`, { state: { course } });
  }

  return (
    <div className="course-card keret padding">
      <h2>{course.title}</h2>
      <p>{course.description}</p>

      <div className="course-meta">
        <span>Difficulty: {course.difficulty}</span>
        <span>Chapters: {course.totalChapters}</span>
        <span>Total credits: {course.totalCredits}</span>
      </div>

      <button
        className="keret padding"
        style={{ background: course.isEnrolled ? "lightgreen" : "beige" }}
        onClick={enroll}
      >
        {course.isEnrolled ? "Continue Learning" : "Enroll Now"}
      </button>
    </div>
  );
}
/*
Course komponens magyarázat:

Ez a komponens egyetlen kurzus megjelenítéséért felel.
A kurzus adatait props-on keresztül kapja meg.

A komponens a CoursesContext-et használja, hogy a beiratkozás
nem csak navigáció legyen, hanem valódi üzleti művelet:
- enrollCourse(course.id) meghívása API-n keresztül
- globális state frissítése

A gomb szövege és stílusa a kurzus isEnrolled állapotától függ.
Navigációkor a course objektumot state-ben továbbadjuk,
így a részletező oldal azonnal hozzáfér az adatokhoz.
*/
