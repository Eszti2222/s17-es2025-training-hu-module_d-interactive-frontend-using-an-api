import React, { useContext, useEffect } from "react";
import { AuthContext } from "../contexts/AuthContext";
import "./css/dashboard.css";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";

import { Line, Doughnut } from "react-chartjs-2";

/* Diagram komponensek regisztrálása – KOMPONENSEN KÍVÜL */
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

export default function DashboardPage() {
  /* AuthContext */
  const { user, loadUser } = useContext(AuthContext);

  /* User betöltése oldalra lépéskor */
  useEffect(() => {
    loadUser();
  }, []);

  /* Loading / wireframe állapot */
  if (!user || !user.user) {
    return <div>Loading dashboard...</div>;
  }

  /* ======== DIAGRAM KONFIGURÁCIÓK ======== */

  /* vonaldiagram */
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
        display: false,
      },
      title: {
        display: true,
        text: "Credit progress (Last 30 days)",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Credits",
        },
      },
      x: {
        title: {
          display: false,
          text: "Date",
        },
      },
    },
  };

  /* kördiagram */
  const options2 = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
      },
      title: {
        display: true,
        text: "Statisztikák",
      },
    },
  };

  /* ======== VONALDIAGRAM ADATOK ======== */

  /* utolsó 30 nap label */
  const labels = [];

  for (let index = 0; index < 30; index++) {
    const d = new Date();
    d.setDate(d.getDate() - (29 - index));
    labels.push(d.toISOString().split("T")[0]);
  }

  /* kreditek dátumonként */
  const creditsByDate = {};

  if (user.recentActivity !== undefined) {
    user.recentActivity.forEach((item) => {
      const date = item.timestamp.split("T")[0];

      if (!creditsByDate[date]) {
        creditsByDate[date] = 0;
      }

      creditsByDate[date] += item.creditsEarned;
    });
  }

  /* adatok az X tengelyhez igazítva */
  const dataValues = labels.map((date) => creditsByDate[date] || 0);

  const data = {
    labels,
    datasets: [
      {
        labels: "Credits",
        data: dataValues,
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };

  /* ======== KÖRDIAGRAM ADATOK ======== */

  const data2 = {
    labels: ["Completed chapters", "Enrolled Courses"],
    datasets: [
      {
        label: "# of Votes",
        data: [
          user.stats.completedChapters,
          user.stats.enrolledCourses,
        ],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
        ],
        borderWidth: 2,
      },
    ],
  };

  /* ======== JSX ======== */

  return (
    <div className="dashboard">
      <h1>Welcome back, {user.user.name}!</h1>

      <div className="diagram">
        <div className="line">
          <Line options={options} data={data} />
        </div>

        <div className="pie">
          <Doughnut options={options2} data={data2} />
        </div>
      </div>
    </div>
  );
}

/*
EGYSZERŰ MAGYARÁZAT – MI TÖRTÉNIK EBEN A FÁJLBAN?

1. Az AuthContextből lekérjük a bejelentkezett felhasználót.
2. A useEffect segítségével az oldal betöltésekor meghívjuk a loadUser() függvényt.
3. Amíg nincs user adat, csak egy „Loading dashboard…” szöveg jelenik meg.
4. A Chart.js komponenseket regisztráljuk, hogy használni tudjuk a diagramokat.
5. Beállítjuk a vonaldiagram és a kördiagram megjelenési beállításait (options).
6. A vonaldiagramhoz előállítjuk az utolsó 30 nap dátumait.
7. A recentActivity adatokból dátumonként összeszámoljuk a szerzett krediteket.
8. Ezekből létrehozzuk a diagramokhoz szükséges data objektumokat.
9. A JSX részben megjelenítjük a vonaldiagramot és a kördiagramot.
*/
