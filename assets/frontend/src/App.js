import "./App.css";
import { createBrowserRouter, Navigate, RouterProvider } from "react-router";
import Layout from "./pages/Layout";
import NoPage from "./pages/NoPage";
import DashboardPage from "./pages/DashboardPage";
import CoursesPage from "./pages/CoursesPage";
import MentorsPage from "./pages/MentorsPage";
import LoginPage from "./pages/LoginPage";
import RegistrationPage from "./pages/RegistrationPage";
import CourseDetailsPage from "./pages/CourseDetailsPage";
import { AuthProvider } from "./contexts/AuthContext";
import authMiddleware from "./middleware/authMiddleware";
import { CoursesProvider } from "./contexts/CoursesContext";
import { MentorProvider } from "./contexts/MentorContext";
import BookedSessionPage from "./pages/BookedSessionPage";
function App() {
  const router = createBrowserRouter([
    {
      path: "/login",
      element: <LoginPage />,
    },
    {
      path: "/register",
      element: <RegistrationPage />,
    },
    {
      path: "/",
      element: <Layout />,
      middleware: [authMiddleware],
      children: [
        {
          index: true,
          element: <Navigate to="/dashboard" replace />,
        },
        {
          path: "/dashboard",
          element: <DashboardPage />,
        },
        {
          path: "courses",
          children: [
            {
              index: true,
              element: <CoursesPage />,
            },
            {
              path: ":id",
              element: <CourseDetailsPage />,
            },
          ],
        },
        {
          path: ":id",
          element: <CourseDetailsPage />,
        },
        {
          path: "/mentors",
          element: <MentorsPage />,
        },
        {
          path: "/bookedsession",
          element: <BookedSessionPage />,
        },
      ],
    },
    {
      path: "*",
      element: <NoPage />,
    },
  ]);
  return (
    <AuthProvider>
      <CoursesProvider>
        <MentorProvider>
          <RouterProvider router={router} />
        </MentorProvider>
      </CoursesProvider>
    </AuthProvider>
  );
}

export default App;

/*
App.js – Provider "ölelgetés" magyarázat:

- A különböző Context Provider-ek (AuthProvider, CoursesProvider, MentorProvider) hierarchikusan ölelik körbe a RouterProvider-t.
- Ez azt jelenti, hogy a RouterProvider alatti összes komponens hozzáfér a context-ekhez.
- Például: bármely komponens eléri a felhasználói adatokat (AuthContext), a kurzus adatokat (CoursesContext) és a mentor adatokat (MentorContext) anélkül, hogy prop-okon keresztül kellene átadni.
- A sorrend fontos: a belső provider-ek hozzáférnek a külső provider-ek state-jéhez, ha szükséges.
- Ez a minta biztosítja a globális állapotkezelést és a context-ek újrafelhasználhatóságát.
*/

/*
App.js – Context Provider és Router struktúra magyarázat

- Az AuthProvider, CoursesProvider és MentorProvider körbeöleli a RouterProvider-t,
  így az alkalmazás összes route-ja és komponense hozzáfér a globális state-ekhez.
- Az AuthProvider felel az autentikációért (bejelentkezés, kijelentkezés, token kezelés),
  ezért kívül helyezkedik el, hogy minden más context és oldal használhassa az auth állapotot.
- A RouterProvider a route konfiguráció alapján rendereli az oldalakat,
  és a Layout komponensen keresztül biztosítja a védett (auth-olt) oldalak közös felépítését.
- A middleware (authMiddleware) a Layout szintjén fut le,
  így automatikusan védi az összes belső route-ot jogosulatlan hozzáférés ellen.
- Ez a struktúra biztosítja a skálázható, jól karbantartható és biztonságos alkalmazásfelépítést.
*/

