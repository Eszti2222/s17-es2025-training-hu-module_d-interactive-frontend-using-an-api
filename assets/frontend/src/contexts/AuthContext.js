import { createContext, useState, useEffect } from "react";
import { myAxios, getAuthHeaders } from "../services/api";

// Context létrehozása
export const AuthContext = createContext();

// Provider komponens
export function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [serverError, setServerError] = useState(null);

  /* =========================
     LOGIN
     ========================= */
  function login(adat) {
    setLoading(true);
    setServerError(null);

    myAxios
      .post("/users/login", adat)
      .then((response) => {
        localStorage.setItem("token", response.data.token);
        setToken(response.data.token);
        setUser(response.data.user);
        window.location.href = "/";
      })
      .catch((error) => {
        hibakezeles(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  /* =========================
     REGISTER
     ========================= */
  function register(adat) {
    setLoading(true);
    setServerError(null);

    myAxios
      .post("/users/register", adat)
      .then(() => {
        window.location.href = "/login";
      })
      .catch((error) => {
        hibakezeles(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  /* =========================
     FELHASZNÁLÓ BETÖLTÉSE
     ========================= */
  useEffect(() => {
    loadUser();
  }, []);

  function loadUser() {
    const savedToken = localStorage.getItem("token");

    if (!savedToken) {
      setUser(null);
      setLoading(false);
      return;
    }

    setToken(savedToken);
    setLoading(true);

    myAxios
      .get("/users/me", { headers: getAuthHeaders() })
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => {
        console.log(error);
        setUser(null);
        localStorage.removeItem("token");
      })
      .finally(() => {
        setLoading(false);
      });
  }

  /* =========================
     LOGOUT
     ========================= */
  function logout() {
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
    window.location.reload();
  }

  /* =========================
     HIBAKEZELÉS
     ========================= */
  function hibakezeles(error) {
    const status = error.response?.status;

    if (status === 400) {
      setServerError("A megadott adatok nem szerepelnek az adatbázisban.");
    } else if (status === 401) {
      setServerError(
        "A hitelesítési token érvénytelen vagy lejárt. Jelentkezz be újra!"
      );
    } else if (status === 403) {
      setServerError("Nincs jogosultsága a kért művelethez!");
    } else if (status === 404) {
      setServerError("A kért erőforrás nem található!");
    } else if (status === 422) {
      setServerError("Validációs hiba történt!");
    } else if (status === 500) {
      setServerError("Szerver hiba történt.");
    } else {
      setServerError("Ismeretlen hiba történt.");
    }
  }

  return (
    <AuthContext.Provider
      value={{
        login,
        register,
        loading,
        user,
        logout,
        serverError,
        loadUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

/*
ÖSSZEFOGLALÓ – AuthContext.js

Ez a fájl az alkalmazás teljes autentikációs logikáját kezeli.
- Tárolja a bejelentkezett felhasználó adatait és a tokent.
- Kezeli a login, register és logout folyamatokat.
- Betölti a felhasználó adatait újratöltés után (token alapján).
- Központi hibakezelést biztosít az API válaszokra.
- Az AuthContext segítségével az adatok és függvények bármely komponensből elérhetők.
*/
