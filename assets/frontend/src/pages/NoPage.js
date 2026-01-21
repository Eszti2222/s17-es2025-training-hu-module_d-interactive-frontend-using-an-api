import React from "react";

export default function NoPage() {
  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <h1>404 - Az oldal nem található</h1>
      <a href="/login">Vissza a főoldalra</a>
    </div>
  );
}

/*
NoPage.js magyarázat:

- Ez a komponens a "404 - Not Found" oldalunk.
- Akkor jelenik meg, ha a felhasználó olyan útvonalra navigál,
  ami nincs definiálva a React Router-ben.
- Egyszerű üzenetet mutat: "Az oldal nem található".
- Tartalmaz egy hivatkozást (<a href="/login">) a bejelentkezési oldalra,
  hogy a felhasználó könnyen visszataláljon az érvényes oldalra.
- Inline stílusokat használ a középre igazítás és padding miatt.
*/
