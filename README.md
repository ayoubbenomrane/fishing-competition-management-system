# 🎣 Fishing Tournament Score Manager

A full-stack JavaScript application for managing fishing competition data, including player registration, scoring, and dynamic rankings. Designed to support per-day scoring, absence penalties, and final aggregated results.

---

## 🚀 Features

- Add, edit, and remove players.
- Record daily performance: number of fish, total weight.
- Automatically assign penalties for absences (e.g., -20).
- Dynamic **daily** and **final** rankings based on performance.
- In-table editing and modals for seamless UX.
- Clean separation between front-end and back-end logic.
- Raw **PostgreSQL** queries for optimal performance and full control.

---

## 🛠️ Tech Stack

- **Backend:** Node.js, Express
- **Database:** PostgreSQL (raw SQL, no ORM)
- **Frontend:** HTML, CSS, JavaScript (vanilla)
- **Tools:** Bootstrap (modals/UI), pg (PostgreSQL client)

---

## 🧠 Domain-Specific Logic

- Players can be **marked as absent**, and are automatically given a score of -20 for that day.
- **Rankings** are computed per "journée" and also cumulatively across all days.
- Final leaderboard reflects player consistency and total weight across all rounds.

---

## 🔗 [Test it yourself !](https://fishing-app.netlify.app/html/)

