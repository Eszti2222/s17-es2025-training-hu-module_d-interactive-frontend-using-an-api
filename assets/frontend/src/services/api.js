import axios from "axios";

// Saját axios példány létrehozása
// Ez tartalmazza az alap URL-t és az alap headereket
export const myAxios = axios.create({
  baseURL: "http://localhost:5000/api/v1",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Auth header generálása minden védett kéréshez
export function getAuthHeaders() {
  const token = localStorage.getItem("token");

  return {
    "X-API-TOKEN": token,
    "Content-Type": "application/json",
  };
}

/*
api.js – API kommunikációs réteg

- Ez a fájl az alkalmazás összes backend kommunikációjának központi belépési pontja.
- A myAxios példány tartalmazza az API alap URL-jét és az alapértelmezett headereket,
  így az alkalmazás minden pontján egységesen történik az adatküldés.
- A getAuthHeaders() függvény a localStorage-ben tárolt autentikációs tokent
  csatolja a kérés header-éhez, amelyet a backend azonosításra használ.
- Ennek köszönhetően az autentikációs logika elkülönül a komponensektől,
  és a UI réteg nem tartalmaz közvetlen API hívásokat.
*/

