import React, { useContext, useEffect } from "react";
import Mentor from "../components/Mentor";
import { MentorContext } from "../contexts/MentorContext";
import { AuthContext } from "../contexts/AuthContext";

export default function MentorsPage() {
  const { mentorList, getMentor } = useContext(MentorContext);
  const { user, loadUser, loading } = useContext(AuthContext);

  useEffect(() => {
    getMentor();
    loadUser();
  }, []);

  if (loading) {
    return (
      <>
        <div className="keret padding">
          <h1>Mentor Session Booking</h1>
          <p>Book one-on-one session...</p>
          <div className="keret padding" style={{ background: "lightblue" }}>
            <strong>Az oldal betöltés alatt!</strong>
          </div>
        </div>
        <div className="sessions keret padding">Az oldal betöltés alatt!</div>
      </>
    );
  }

  return (
    <>
      <div className="keret padding">
        <h1>Mentor Session Booking</h1>
        <p>Book one-on-one session...</p>
        <div className="keret padding" style={{ background: "lightblue" }}>
          <strong>
            Your Current Balance:{" "}
            {user.user.creditBalance ? user.user.creditBalance : 0} Credits
          </strong>
          <br />
          <span>
            Session are automaticly checked for confirmation every 30 seconds
          </span>
        </div>
      </div>

      <div className="sessions keret padding">
        <h2>Available Sessions</h2>
        {mentorList
          ? mentorList.map((mentor, i) => <Mentor mentor={mentor} key={i} />)
          : null}
      </div>
    </>
  );
}

/*
MentorsPage összefoglaló:

- useContext(MentorContext) és useContext(AuthContext) a mentorok és user adatok elérésére.
- useEffect: oldal betöltésekor lefut a getMentor() és loadUser() függvény.
- Betöltés alatt: loading state true → placeholder jelenik meg ("Az oldal betöltés alatt!").
- Mentor listát map-oljuk és minden elemet a Mentor komponens renderel.
- Jelenítjük a felhasználó creditBalance-ét is.
- App.js "ölelgetés": a MentorProvider körbeöleli a RouterProvider-t, így a mentor adatok minden alkomponensből elérhetők.
*/

