import { useState } from "react";
import { NavLink } from "react-router";
import "./login.css";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  function validateForm() {
  const newErrors = {};

  if (!email) {
    newErrors.email = "Az email cím kötelező";
  } else if (!/\S+@\S+\.\S+/.test(email)) {
    newErrors.email = "Érvénytelen email formátum";
  }

  if (!password) {
    newErrors.password = "A jelszó kötelező";
  } else if (password.length < 6) {
    newErrors.password =
      "A jelszónak legalább 6 karakter hosszúnak kell lennie";
  }

  return newErrors;
}


 function handleSubmit(e) {
  e.preventDefault();

  const validationErrors = validateForm();
  if (Object.keys(validationErrors).length > 0) {
    setErrors(validationErrors);
    return;
  }

  console.log("Login adatok:", { email, password });
}

  return (
    <div className="auth-container">
      <h2>Bejelentkezés</h2>

      <form onSubmit={handleSubmit} className="auth-form">
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && (
            <span className="error-text">{errors.email}</span>
          )}
        </div>

        <div className="form-group">
          <label>Jelszó</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {errors.password && (
            <span className="error-text">{errors.password}</span>
          )}
        </div>

        <button type="submit">Bejelentkezés</button>
      </form>

      <p className="auth-link">
        Nincs még fiókod? <NavLink to="/register">Regisztráció</NavLink>
      </p>
    </div>
  );
}

export default LoginPage;


/*
LOGINPAGE ÖSSZEFOGLALÓ

Ez a komponens a felhasználó bejelentkezését valósítja meg.

- A beviteli mezők (email, password) saját state-ben vannak tárolva
  a useState hook segítségével.
- Az input mezők controlled inputok, vagyis a value mindig a state-ből
  érkezik, és az onChange esemény frissíti a state-et.
- Az errors state egy objektum, amely a validáció során keletkező
  hibaüzeneteket tartalmazza mezőnként (pl. email, password).
- A validateForm függvény ellenőrzi az űrlap mezőit, és egy hibaobjektumot
  ad vissza, amelyet a submit eseményben dolgozunk fel.
- A handleSubmit függvény megakadályozza az oldal újratöltését,
  meghívja a validációt, és csak akkor engedi tovább a feldolgozást,
  ha nincs hiba.
- A hibaüzenetek csak akkor jelennek meg, ha az adott mezőhöz
  tartozik hiba az errors objektumban.
- A form alján NavLink segítségével biztosított az átjárás
  a regisztrációs oldalra.
*/
