import { NavLink } from "react-router";
import "./css/login.css";
import React, { useContext, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";

function RegistrationPage() {
  const { register, serverError } = useContext(AuthContext);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCPassword] = useState("");
  const [errors, setErrors] = useState({});

  function validateForm() {
    const newErrors = {};

    if (!name) {
      newErrors.name = "A név megadása kötelező";
    } else if (name.length < 3) {
      newErrors.name = "A névnek legalább 3 karakter hosszúnak kell lennie";
    }

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

    if (!cpassword) {
      newErrors.cpassword = "Ismételd meg a jelszót";
    } else if (password !== cpassword) {
      newErrors.cpassword = "A két jelszó nem egyezik";
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

    /* console.log("Regisztrációs adatok:", {
      name,
      email,
      password,
      cpassword,
    });*/

    register({ name, email, password, cpassword });
  }

  return (
    <div className="auth-container">
      <h2>Regisztráció</h2>

      <form onSubmit={handleSubmit} className="auth-form">
        <div className="form-group">
          <label>Név</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {errors.name && <span className="error-text">{errors.name}</span>}
        </div>

        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && <span className="error-text">{errors.email}</span>}
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

        <div className="form-group">
          <label>Jelszó megerősítése</label>
          <input
            type="password"
            value={cpassword}
            onChange={(e) => setCPassword(e.target.value)}
          />
          {errors.cpassword && (
            <span className="error-text">{errors.cpassword}</span>
          )}
        </div>

        <button type="submit">Regisztráció</button>
      </form>

      <p className="auth-link">
        Van már fiókod? <NavLink to="/login">Bejelentkezés</NavLink>
      </p>
    </div>
  );
}

export default RegistrationPage;

/*
REGISTRATIONPAGE ÖSSZEFOGLALÓ

Ez a komponens az új felhasználók regisztrációját valósítja meg.

- A komponens saját state-eket használ a név, email, jelszó és
  jelszó megerősítés (cpassword) mezők kezelésére.
- Az input mezők controlled inputként működnek, a value értékük
  mindig a state-ből származik, az onChange esemény frissíti azt.
- Az errors state egy objektum, amely mezőnként tartalmazza
  a validáció során keletkező hibaüzeneteket.
- A validateForm függvény ellenőrzi:
  - a név meglétét és minimális hosszát
  - az email kötelező jellegét és formátumát
  - a jelszó hosszát
  - a jelszó és a jelszó megerősítés egyezőségét
  A függvény egy hibaobjektumot ad vissza.
- A handleSubmit függvény megakadályozza az oldal újratöltését,
  meghívja a validációt, és csak akkor folytatja a feldolgozást,
  ha nincs hiba.
- A hibaüzenetek az input mezők alatt jelennek meg, csak akkor,
  ha az adott mezőhöz tartozik hiba.
- A form alján NavLink segítségével biztosított az átjárás
  a bejelentkezési oldalra.
*/

/*
RegistrationPage – Regisztrációs oldal

- A komponens új felhasználók adatainak bekérésére szolgál.
- A kliensoldali validáció biztosítja az alap adatminőséget
  (kötelező mezők, email formátum, jelszó egyezés).
- A sikeres validáció után a regisztrációs folyamatot
  az AuthContext register() függvénye végzi el.
- Az API kommunikáció és a hibakezelés nem a komponens feladata,
  ezzel a komponens tiszta UI logikát valósít meg.
*/
