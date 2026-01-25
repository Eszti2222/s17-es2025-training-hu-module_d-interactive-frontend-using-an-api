import React, { useContext, useEffect } from "react";
import Course from "../components/Course";
import CourseSearch from "../components/CourseSearch";
import { CoursesContext } from "../contexts/CoursesContext";

import "./css/courses.css";

export default function CoursesPage() {
  const { getCourses, filteredList, loading, serverError } =
    useContext(CoursesContext);

  useEffect(() => {
    getCourses();
  }, []);

  if (loading || filteredList.length === 0) {
    // Betöltés alatt ezt jeleníti meg
    return (
      <>
        <CourseSearch />
        <div className="courses">
          Betöltés folyamatban, vagy nincs kurzus!
          {serverError && <p className="error-text">{serverError}</p>}
        </div>
      </>
    );
  }

  return (
    <>
      <CourseSearch />
      <div className="courses">
        {filteredList.map((course) => {
          return <Course course={course} key={course.id} />;
        })}
      </div>
    </>
  );
}

/*
CoursesPage ÖSSZEFOGLALÓ

- A CoursesPage komponens a kurzusok listáját jeleníti meg.
- Az adatok és az üzleti logika a CoursesContext-ben található.
- useEffect segítségével a komponens betöltésekor automatikusan lekéri a kurzusokat (getCourses).
- Betöltés vagy üres lista esetén a felhasználó számára egy üzenetet jelenít meg.
- A CourseSearch komponens lehetővé teszi a kurzusok keresését és szűrését, amely szintén a context logikáját használja.
- A serverError megjelenítésével az API hibákat is visszajelzi.
- A komponens csak megjelenítéssel és felhasználói interakcióval foglalkozik, a Context kezeli a state-et és az adatlekérést.
*/

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
