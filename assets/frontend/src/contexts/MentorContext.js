import { myAxios, getAuthHeaders } from "../services/api";
import { createContext, useState } from "react";

export const MentorContext = createContext();

export function MentorProvider({ children }) {
  const [mentorList, setMentorList] = useState([]);
  const [loading, setLoading] = useState(true);

  function getMentor() {
    setLoading(true);
    myAxios
      .get("/mentors/sessions", { headers: getAuthHeaders() })
      .then((response) => {
        setMentorList(response.data.sessions); // sessions mező
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => setLoading(false));
  }

  function bookedSession(id) {
    setLoading(true);
    return myAxios
      .post(`/mentors/sessions/${id}/book`, {}, { headers: getAuthHeaders() })
      .then((response) => response)
      .catch((error) => {
        throw error;
      })
      .finally(() => setLoading(false));
  }

  return (
    <MentorContext.Provider
      value={{ getMentor, mentorList, loading, bookedSession }}
    >
      {children}
    </MentorContext.Provider>
  );
}

/*
MentorContext összefoglaló:

- Létrehoz egy globális state-et a mentorList és loading kezelésére.
- getMentor(): lekéri a mentor session-öket a backendről, a token-t a getAuthHeaders() adja hozzá a fejlécben.
- bookedSession(id): lefoglal egy mentor session-t POST-tal, hibát kezelünk, navigáció a foglalás oldalra.
- Provider value: mindenhol elérhető getMentor, mentorList, loading, bookedSession.
- Használat App.js-ben: a MentorProvider "ölelgeti" a RouterProvider-t, így minden komponens hozzáférhet a MentorContexthez.
*/
