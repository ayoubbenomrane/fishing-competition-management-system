import { getJournees, getRecords, getJoueurs, updateRecord } from "./api.js";
const journeeList = document.querySelector('#journee-list');

console.log("Starting app.js..."); // ✅ Log before anything else

const joueurData = await getJoueurs();
const joueurMap = {};

joueurData.forEach(joueur => {
  joueurMap[joueur.id] = joueur;
});

async function loadJournees() {
  try {
    console.log("Calling loadJournees()...");
    const journeeData = await getJournees();
    
    for (const journee of journeeData) {
      const recordData = await getRecords(journee.id);
      const journeedetail = document.createElement("div");
      journeedetail.classList = `journee-${journee.id}`;
      journeedetail.innerHTML = `
          <h5>
            Titre = ${journee.name} | Localisation = ${journee.place} | Durée = ${journee.duration} | Date=${journee.date} 
          </h5>
          <table>
            <thead>
              <tr>
                <th>Nom et Prénom</th>
                <th>nbr de poisson</th>
                <th>poids (kg)</th>
                <th>score</th>
                <th>rang</th>
              </tr>
            </thead>
            <tbody id="table-${journee.id}"></tbody>
          </table>
      `;
      journeeList.appendChild(journeedetail);
      updateTable(journee.id, recordData);
    }
  } catch (error) {
    console.error(error);
  }
}

async function updateTable(journee_id, recordData) {
  const tbody = document.getElementById(`table-${journee_id}`);
  tbody.innerHTML = "";

  // Sort records by score in descending order
  recordData.sort((a, b) => b.score - a.score);
  
  recordData.forEach((record, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${joueurMap[record.joueur_id].name}</td>
      <td class="fish_count" contenteditable id=${record.id}>${record.fish_count}</td>
      <td class="total_weight" contenteditable id=${record.id}>${record.total_weight}</td>
      <td>${record.score}</td>
      <td>${index + 1}</td>
    `;
    tbody.appendChild(row);
  });
}

async function saveCell(cell) {
  const body = { [cell.classList[0]]: cell.textContent };
  cell.classList.remove("on-focus");
  console.log(body);
  await updateRecord(cell.id, body);
  
  // Reload updated records & table order
  const journee_id = cell.closest("tbody").id.split("-")[1];
  const updatedRecords = await getRecords(journee_id);
  updateTable(journee_id, updatedRecords);
}

function tableUpdating() {
  document.body.addEventListener("click", (event) => {
    const clickedCell = event.target.closest("td[contenteditable]");
    if (clickedCell) {
      clickedCell.focus();
      clickedCell.classList.add("on-focus");

      clickedCell.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
          event.preventDefault();
          saveCell(clickedCell);
        }
      });

      clickedCell.addEventListener("blur", () => {
        saveCell(clickedCell);
      });
    }
  });
}

loadJournees();
tableUpdating();

// -------------   managing dialogs -------------

const playerDialog=document.getElementById("add-player-modal");
const addPlayerButton=document.getElementById("add-player-button");
addPlayerButton.addEventListener('click',()=>{
  playerDialog.showModal();
});


