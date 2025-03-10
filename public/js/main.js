import { getJournees, getRecords, getJoueurs, updateRecord, addPlayer ,addJournee} from "./api.js";

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
    journeeList.innerHTML="";

    const journeeData = await getJournees();

    for (const journee of journeeData) {
      const recordData = await getRecords(journee.id);

      // Create a container for the journée
      const journeeDetail = document.createElement("div");
      journeeDetail.classList.add("mb-4", "p-3", "bg-white", "shadow-sm", "rounded");

      // Add the journée title
      const title = document.createElement("h5");
      title.classList.add("mb-3");
      title.textContent = `Titre = ${journee.name} | Localisation = ${journee.place} | Durée = ${journee.duration} | Date = ${journee.date}`;
      journeeDetail.appendChild(title);

      // Create the table
      const table = document.createElement("table");
      table.classList.add("table", "table-striped", "table-bordered");

      // Create the table header
      const thead = document.createElement("thead");
      thead.classList.add("table-dark");
      thead.innerHTML = `
        <tr>
          <th>Nom et Prénom</th>
          <th>nbr de poisson</th>
          <th>poids (kg)</th>
          <th>score</th>
          <th>rang</th>
        </tr>
      `;
      table.appendChild(thead);

      // Create the table body
      const tbody = document.createElement("tbody");
      tbody.id = `table-${journee.id}`;
      table.appendChild(tbody);

      // Append the table to the journée container
      journeeDetail.appendChild(table);

      // Append the journée container to the journee list
      journeeList.appendChild(journeeDetail);

      // Update the table with records
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


async function saveCell(cell,prev) {
  if(cell.textContent==""){cell.textContent=prev;return}
  else{
    const body = { [cell.classList[0]]: cell.textContent };

    cell.classList.remove("on-focus");
    console.log(body)
  await updateRecord(cell.id, body);
  const journee_id = cell.closest("tbody").id.split("-")[1];
  const updatedRecords = await getRecords(journee_id);
  updateTable(journee_id, updatedRecords);
  // Reload updated records & table order
  
}}


function tableUpdating() {
  document.body.addEventListener("click", (event) => {
    const clickedCell = event.target.closest("td[contenteditable]");
    if (clickedCell) {
      clickedCell.focus();
      clickedCell.classList.add("on-focus");
      const prev =clickedCell.textContent;
      clickedCell.textContent="";
      clickedCell.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
          event.preventDefault();
          saveCell(clickedCell,prev);
        }
      });

      // clickedCell.addEventListener("blur", () => {
      //   saveCell(clickedCell,prev);
      // });
    }
  });
}

loadJournees();
tableUpdating();

// ------------- Managing dialogs -------------

const journeeForm=document.getElementById("journee-form");
journeeForm.addEventListener("submit",async (event)=>{
  event.preventDefault();
  const name=document.getElementById("journee-name").value;
  const date=document.getElementById("journee-date").value;
  const place=document.getElementById("journee-place").value;
  const hours=document.getElementById("hours").value;
  const minutes=document.getElementById("minutes").value;
  const duration= ` ${hours}:${minutes}`
  console.log(duration)
  console.log(minutes)
  const data={
    "name":name,
    "date":date,
    "place":place,
    "duration":duration
  }
  console.log(data)
  const modal = bootstrap.Modal.getInstance(document.getElementById("add-journee-modal"));
  modal.hide();
  await addJournee(data);


})



// -------manage toggle switches ----

document.addEventListener("click", async (event) => {
  if (event.target.classList.contains("absent-toggle")) {
    console.log(event.target);
    const button = event.target;
    if(button.hasAttribute("checked")){
      button.removeAttribute("checked")
      await updateRecord(button.id,{"absent":false})
      console.log(button.id)
    }
    else{
      button.setAttribute("checked","")
      await updateRecord(button.id,{"absent":true})


    }
    // loadJournees();


  }
});
