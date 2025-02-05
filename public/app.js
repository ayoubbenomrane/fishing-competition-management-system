import { getJournees, getRecords, getJoueurs,updateRecord } from "./api.js";
const journeeList = document.querySelector('#journee-list');

console.log("Starting app.js..."); // ✅ Log before anything else

const joueurData = await getJoueurs();
const joueurMap = {};

joueurData.forEach(joueur => {
  joueurMap[joueur.id] = joueur;

});

async function loadJournees() {
  try {
    console.log("Calling loadJournee()..."); // ✅ Log before calling getJournee

    const journeeData = await getJournees();
    const l = journeeData.length
    for (let i = 0; i < l; i++) {
      const journee = journeeData[i];
      const recordData = await getRecords(journee.id);
      const journeedetail = document.createElement("div");
      journeedetail.classList = `journee-${journee.id}`;
      journeedetail.innerHTML = `
          <h5>
            Titre = ${journee.name}   |   Localisation = ${journee.place}    |   Durée = ${journee.duration}    |    Date=${journee.date} 
          </h5>
          <table id="test">
            <thead>
              <tr>
                <th>Nom et Prénom</th>
                <th>nbr de poisson</th>
                <th>poids (kg)</th>
                <th>score</th>
                <th>rang</th>

              </tr>
            </thead>
            <tbody id="table-${journee.id}">
            </tbody>

        </table>
      ` ;
      journeeList.appendChild(journeedetail);
      const tbody = document.getElementById(`table-${journee.id}`)
      tbody.innerHTML = "";
      for (let j = 0; j < recordData.length; j++) {

        const row = document.createElement("tr");
        const record = recordData[j]
        row.classList.add(`record`);
        row.innerHTML = `
            <td id=${record.id} >${joueurMap[record.joueur_id].name}</td>
            <td class="fish_count" contenteditable id=${record.id}>${record.fish_count}</td>
            <td class="total_weight" contenteditable id=${record.id}>${record.total_weight}</td>
            <td id=${record.id}>${record.score}</td>
            <td id=${record.id}>${j + 1}</td>
        
        `;
        tbody.appendChild(row);


      }


    }
    tableUpdating();
  }

  catch (error) {
    console.error(error);
    throw error;
  }
}

loadJournees()

const saveCell= (cell)=>{
  const body={
    [cell.className]:cell.textContent
  }
  console.log(body);
  updateRecord(cell.id,body)

};


function tableUpdating() {
  const table = document.querySelector("#test")
  console.log(table)
  table.addEventListener("click", (event) => {
    // Check if the clicked element is a <td> inside a <table>
    const clickedCell = event.target.closest("td");

    if (clickedCell.hasAttribute('contenteditable')) {
      const originalvalue = clickedCell.textContent
      // console.log(clickedCell.id)
      // console.log(clickedCell.className )
      // console.log(clickedCell.textContent)
      clickedCell.focus();


      clickedCell.style.backgroundColor = "lightgrey";
      clickedCell.addEventListener('blur', () => {
        saveCell(clickedCell);
      })
    }

  });
}
