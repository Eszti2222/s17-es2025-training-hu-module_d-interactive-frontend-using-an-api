import React from "react";

import { Outlet } from "react-router";
import Navigation from "./Navigation";

function Layout() {
  return (
    <>
      <header>
        <Navigation />
      </header>

      <main>
        <Outlet />
      </main>

      <footer>
        <p>Készítette: Nagy Eszter</p>
      </footer>
    </>
  );
}

export default Layout;
