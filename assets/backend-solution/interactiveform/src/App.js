
import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import "./App.css";
import Layout from "./pages/Layout";
import Navigation from "./pages/Navigation";
import DashboardPage from "./pages/DashboardPage";
import CoursesPage from "./pages/CoursesPage";
import CourseDetailsPage from "./pages/CourseDetailsPage";
import BookedSessionPage from "./pages/BookedSessionPage";
import MentorsPage from "./pages/MentorsPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import NoPage from "./pages/NoPage";



const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />, 
    children: [
      {
        index: true,
        element: <Navigation to="/dashboard" replace />,
      },
      {
        path: "dashboard",
        element: <DashboardPage />,
      },
      {
        path: "courses",
        element: <CoursesPage />,
      },
      {
        path: "course/:id",
        element: <CourseDetailsPage />,
      },
      {
        path: "booked-session",
        element: <BookedSessionPage />,
      },
      {
        path: "mentors",
        element: <MentorsPage />,
      },
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "register",
        element: <RegisterPage />,
      },
    ],
  },
  {
    path: "*",
    element: <NoPage />,
  },
]);

function App() {
  return (
    <div className="App">

    </div>
  );
}

export default App;
``
