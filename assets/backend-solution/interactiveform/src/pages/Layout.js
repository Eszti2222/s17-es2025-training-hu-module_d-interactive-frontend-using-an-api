
import React from "react";
import Navigation from "./Navigation";



const Layout = ({ children }) => {
  return (
    <div className="layout">
      <header>
        <h1>My App</h1>
        <Navigation />
      </header>
      <main>{children}</main>
      <footer>
        <p>Nagy Eszter</p>
      </footer>
    </div>
  );
};

export default Layout;
