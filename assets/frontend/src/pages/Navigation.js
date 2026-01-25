import React, { useContext } from "react";
import { NavLink } from "react-router";
import "./navigation.css";
import { AuthContext } from "../contexts/AuthContext";

function Navigation() {
  // AuthContext-ből lekérjük a felhasználói adatokat és műveleteket
  const { user, logout, loading } = useContext(AuthContext);

  // Amíg az autentikációs állapot betölt,
  // vagy nincs bejelentkezett felhasználó,
  // nem rendereljük a teljes navigációt
  if (loading || !user) {
    return <nav className="navigation">Betöltés folyamatban...</nav>;
  }

  return (
    <header>
      <nav className="navigation">
        {/* Bal oldal – alkalmazás neve */}
        <ul>
          <li className="kiemelt">
            <strong>Skillshare Academy</strong>
          </li>
        </ul>

        {/* Középső menüpontok */}
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

        {/* Jobb oldal – felhasználói információk */}
        <ul>
          <li className="kiemelt">
            {user.user?.creditBalance ?? "0"} credits
          </li>
          <li>
            Welcome {user.user?.name ?? "Guest"}
          </li>
          <li className="kiemelt" onClick={logout}>
            Logout
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Navigation;

/*
NAVIGATION – AUTHENTIKÁCIÓVAL VEZÉRELT MENÜ

- Ez a komponens az alkalmazás felső navigációs sávját valósítja meg.
- Az AuthContext segítségével hozzáfér a globális autentikációs állapothoz:
  - user: a bejelentkezett felhasználó adatai
  - logout: kijelentkezési függvény
  - loading: jelzi, hogy az auth állapot betöltése folyamatban van
- A komponens csak akkor rendereli a teljes navigációt,
  ha az autentikáció már lefutott és van bejelentkezett felhasználó.
- Ez megakadályozza, hogy a navigáció jogosulatlan vagy félkész állapotban jelenjen meg.
- A menü három logikai részre van bontva:
  1. Alkalmazás neve (statikus tartalom)
  2. Navigációs linkek (Dashboard, Courses, Mentors)
  3. Felhasználói információk (kredit, név, kijelentkezés)
- A Logout elem eseménykezelővel (onClick) hívja meg a context logout függvényét,
  amely törli a tokent és visszaállítja az auth állapotot.
- A Navigation komponens nem tartalmaz üzleti logikát vagy API hívást,
  kizárólag az AuthContext által biztosított adatokat és műveleteket használja.
*/
