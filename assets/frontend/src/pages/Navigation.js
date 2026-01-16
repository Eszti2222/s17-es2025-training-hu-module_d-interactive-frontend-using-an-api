import { NavLink } from "react-router";
import "./navigation.css";

function Navigation() {
  return (
    <nav className="navigation">
      <ul>
        <li>
          <NavLink to="/dashboard">Dashboard</NavLink>
        </li>
        <li>
          <NavLink to="/courses">Courses</NavLink>
        </li>
        <li>
          <NavLink to="/mentors">Mentors</NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;
