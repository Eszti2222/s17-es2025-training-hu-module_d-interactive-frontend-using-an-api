import { redirect } from "react-router";

/*
  Ez a middleware (loader) minden védett route betöltése előtt lefut.
  Ellenőrzi, hogy létezik-e token a localStorage-ban.
  Ha nincs token → átirányít a /login oldalra.
*/

async function authMiddleware() {
  const token = localStorage.getItem("token");

  if (!token) {
    throw redirect("/login");
  }

  return null;
}

export default authMiddleware;

/*
ÖSSZEFOGLALÓ – authMiddleware.js

Ez a fájl a védett útvonalak hitelesítését végzi.
- Route betöltése előtt lefut (middleware / loader).
- Ellenőrzi, hogy van-e token a localStorage-ban.
- Ha nincs token, a felhasználót a /login oldalra irányítja.
- Biztosítja, hogy csak bejelentkezett felhasználók érhessék el a védett oldalakat.
*/
