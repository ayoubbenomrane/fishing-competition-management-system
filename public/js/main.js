import { getJournees, getRecords, getJoueurs, updateRecord, addPlayer ,addJournee} from "./api.js";

const journeeList = document.querySelector('#journee-list');

console.log("Starting app.js..."); // ✅ Log before anything else

const joueurData = await getJoueurs();
const joueurMap = {};

joueurData.forEach(joueur => {
  joueurMap[joueur.id] = joueur;
});
const diskIcon=`<svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
  <path fill-rule="evenodd" d="M5 3a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V7.414A2 2 0 0 0 20.414 6L18 3.586A2 2 0 0 0 16.586 3H5Zm3 11a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v6H8v-6Zm1-7V5h6v2a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1Z" clip-rule="evenodd"/>
  <path fill-rule="evenodd" d="M14 17h-4v-2h4v2Z" clip-rule="evenodd"/>
</svg>
`
const tagIcon=`<svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.583 8.445h.01M10.86 19.71l-6.573-6.63a.993.993 0 0 1 0-1.4l7.329-7.394A.98.98 0 0 1 12.31 4l5.734.007A1.968 1.968 0 0 1 20 5.983v5.5a.992.992 0 0 1-.316.727l-7.44 7.5a.974.974 0 0 1-1.384.001Z"/>
</svg>
`
const pinIcon =`<svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15a6 6 0 1 0 0-12 6 6 0 0 0 0 12Zm0 0v6M9.5 9A2.5 2.5 0 0 1 12 6.5"/>
</svg>
`
const calendarIcon=`<svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 10h16m-8-3V4M7 7V4m10 3V4M5 20h14a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1Zm3-7h.01v.01H8V13Zm4 0h.01v.01H12V13Zm4 0h.01v.01H16V13Zm-8 4h.01v.01H8V17Zm4 0h.01v.01H12V17Zm4 0h.01v.01H16V17Z"/>
</svg>
`
const closckIcon=`<svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
  <path fill-rule="evenodd" d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm11-4a1 1 0 1 0-2 0v4a1 1 0 0 0 .293.707l3 3a1 1 0 0 0 1.414-1.414L13 11.586V8Z" clip-rule="evenodd"/>
</svg>
`;
async function loadJournees() {
  journeeList.innerHTML="";
  try {
    console.log("Calling loadJournees()...");
    const journeeData = await getJournees();

    for (const journee of journeeData) {
      const recordData = await getRecords(journee.id);
      console.log("record  ", recordData)
      for(const record of recordData){
        if(record.absent) {record.score=-20;}
      }
      // Create a container for the journée
      const journeeDetail = document.createElement("div");
      journeeDetail.classList.add("mb-4", "p-3", "bg-white", "shadow-sm", "rounded");

      // Add the journée title
      const title = document.createElement("div");
      title.id=journee.id;
      title.innerHTML=`
        <div class="d-flex justify-content-around w-75"> 
          <div>${tagIcon} ${journee.name}   </div>
          <div>${pinIcon}  ${journee.place}  </div>
          <div>${closckIcon}  ${journee.duration}  </div>
          <div> ${calendarIcon} ${journee.date.split("T")[0]} </div>
        </div>
        <button class="save-button" id=${journee.id}>${diskIcon}</button>
        

      `
      title.classList.add("mb-3","d-flex" ,"justify-content-between");
      

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
          <th>absent</th>
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
      <td class="fish_count" contenteditable id=${record.id}>${record.absent? 0: record.fish_count }</td>
      <td class="total_weight" contenteditable id=${record.id}>${record.absent? 0: record.total_weight }</td>
      <td>${record.absent? -20: record.fish_count }</td>
      <td>${index + 1}</td>
      <td>
        <div class="form-check form-switch">
          <input class="form-check-input absent-toggle" type="checkbox" toggleSwitch id="${record.id}"   ${record.absent ? "checked" :""} >
          
        </div>
      </td>
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
  // updateTable(journee_id, updatedRecords);
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
      clickedCell.addEventListener("blur", () => {
        saveCell(clickedCell,prev);
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

document.addEventListener("click",async (event)=>{
  if(event.target.closest(".save-button")){
    loadJournees();
  }

})