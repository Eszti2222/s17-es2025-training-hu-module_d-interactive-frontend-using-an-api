import { useContext, useEffect } from "react";
import Course from "../components/Course";
import CourseSearch from "../components/CourseSearch";
import { CoursesContext } from "../contexts/CoursesContext";

import "../css/courses.css";
``


export default function CoursesPage() {
  const { getCourses, filteredList, loading } =
    useContext(CoursesContext);

  useEffect(() => {
    getCourses();
  }, []);

  if (loading || filteredList.length === 0) {
    return (
      <>
        <CourseSearch />
        <div className="courses">
          Betöltés folyamatban, vagy nincs kurzus!
        </div>
      </>
    );
  }

  return (
    <>
      <CourseSearch />
      <div className="courses">
        {filteredList.map((course) => (
          <Course course={course} key={course.id} />
        ))}
      </div>
    </>
  );
}
/*
CoursesPage magyarázat:

Ez az oldal a kurzusok listáját jeleníti meg.
Az adatok és az üzleti logika a CoursesContext-ben található,
nem ebben a komponensben.

A komponens betöltésekor a getCourses() lefut useEffect segítségével.
A keresés és szűrés a CourseSearch komponensen keresztül történik,
amely a Context szűrő függvényét használja.

A CoursesPage csak megjelenít:
- loading állapot kezelése
- kurzus lista renderelése
*/
