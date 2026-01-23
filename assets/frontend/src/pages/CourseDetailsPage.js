
// src/pages/CourseDetailsPage.js

import { useParams, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { CoursesContext } from "../contexts/CoursesContext";

export default function CourseDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { courses } = useContext(CoursesContext);

  const course = courses.find((c) => c.id === Number(id));

  if (!course) {
    return <h2>Course not found</h2>;
  }

  return (
    <div className="course-details-page">
      <button className="keret padding" onClick={() => navigate(-1)}>
        Back to courses
      </button>

      <h1>{course.title}</h1>
      <p>{course.description}</p>

      <div className="progress-section keret padding">
        <h3>Chapter Progress</h3>
        <progress
          max={course.chapters}
          value={course.completedChapters}
        ></progress>
        <p>
          {course.completedChapters} of {course.chapters} chapters completed (
          {((course.completedChapters / course.chapters) * 100).toFixed(0)}%)
        </p>
      </div>

      <div className="credit-section keret padding">
        <h3>Credit Progress</h3>
        <progress max={course.credits} value={course.earnedCredits}></progress>
        <p>
          {course.earnedCredits} of {course.credits} credits earned
        </p>
      </div>

      <h2>Chapters</h2>
      {course.chapterList.map((ch) => (
        <div key={ch.id} className="chapter-card keret padding">
          <h3>{ch.title}</h3>
          <p>{ch.description}</p>
          <span>{ch.credits} credits</span>
          <button className="keret padding">
            {ch.completed ? "Completed" : "Mark as completed"}
          </button>
        </div>
      ))}
    </div>
  );
}
