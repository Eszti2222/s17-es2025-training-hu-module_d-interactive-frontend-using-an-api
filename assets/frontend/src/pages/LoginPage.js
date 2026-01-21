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
