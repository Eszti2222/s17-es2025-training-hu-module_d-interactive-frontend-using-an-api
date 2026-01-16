import { useState } from "react";
import { NavLink } from "react-router";
import "./login.css";

function RegistrationPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  function validateForm() {
    const newErrors = {};

    if (!name) {
      newErrors.name = "A név megadása kötelező";
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

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (validateForm()) {
      console.log("Regisztrációs adatok:", {
        name,
        email,
        password,
      });
    }
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
          {errors.name && (
            <span className="error-text">{errors.name}</span>
          )}
        </div>

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

        <button type="submit">Regisztráció</button>
      </form>

      <p className="auth-link">
        Van már fiókod? <NavLink to="/login">Bejelentkezés</NavLink>
      </p>
    </div>
  );
}

export default RegistrationPage;
