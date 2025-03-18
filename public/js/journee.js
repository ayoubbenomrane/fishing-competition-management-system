import { getJournees, addJournee,updateJournee ,deleteJournee} from "./api.js";
const listeJournee = document.getElementById("liste-journee");
const deleteIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
  <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
  <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
</svg>`

const updateIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-fill" viewBox="0 0 16 16">
  <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.5.5 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11z"/>
</svg>`
async function loadJournees() {
    try {
        listeJournee.innerHTML = "";
        const journeesData = await getJournees();
        for (const journee of journeesData) {
            const journeeCard = document.createElement("div");
            journeeCard.className = "col-md-4 mb-4";
            journeeCard.innerHTML =
                `
    <div class="card d-flex flex-row justify-content-between p-2">
        <div>
            
            <h3>${journee.name}</h3>
            <p>Place: ${journee.place}</p>
            <p>Date: ${journee.date.split('T')[0]}</p>
            <p>Durée: ${journee.duration}</p>

        </div>
        
        <div class="p-1">
            <button type="button" class="btn btn-warning" id="${journee.id}" data-bs-toggle="modal" data-bs-target="#update-player-modal">${updateIcon}</button>
            <button type="button" class="btn btn-danger" id="${journee.id}" >${deleteIcon}</button>

        </div>

    </div>
        
            `
            listeJournee.appendChild(journeeCard)

        }

    }
    catch (error) {
        console.error(error)
    }
}
loadJournees()

const journeeForm = document.getElementById("journee-form");
const addJourneeButton = document.getElementById("add-journee-button")
const modal = document.querySelector(".update-journee");
const closeButton = document.querySelector(".close-button")
addJourneeButton.addEventListener("click", async (event) => {
    event.preventDefault()
    modal.showModal()
    closeButton.addEventListener("click", () => {
        modal.close()
    })
    journeeForm.addEventListener("submit", async (event) => {
        event.preventDefault();
        const name = document.getElementById("journee-name").value;
        const date = document.getElementById("journee-date").value;
        const place = document.getElementById("journee-place").value;
        const hours = document.getElementById("hours").value;
        const minutes = document.getElementById("minutes").value;
        const duration = ` ${hours}:${minutes}`
        console.log(duration)
        console.log(minutes)
        const data = {
            "name": name,
            "date": date,
            "place": place,
            "duration": duration
        }
        console.log(data)
        
        await addJournee(data);
        modal.close();
        loadJournees()
    })

})

document.addEventListener("click",async (event)=>{
    if(event.target.closest(".btn-danger")){
        const button=event.target.closest(".btn-danger");
        await deleteJournee(button.id);
        await loadJournees();

    }
})


document.addEventListener("click",async (event)=>{
    if(event.target.closest(".btn-warning")){
        const button=event.target.closest(".btn-warning")
        modal.showModal();
        closeButton.addEventListener("click",()=>{
            modal.close();
        });
        const id=button.id;
        console.log(id,"  eee  ")
        journeeForm.addEventListener("submit",async (event)=>{
            event.preventDefault()
            const formData=new FormData(journeeForm)
            const filteredData= {};
            for(const [key,value] of formData){
                
                if(value!='' && key!='hours' && key!='minutes'){
                    filteredData[key]=value;
                    
                }

            }
            if(formData.get('hours')!=''){
                filteredData[duration]=`${formData.get('hours')}:${formData.get('minutes')}`
            }
            await updateJournee(id,filteredData);
            modal.close()
            loadJournees();

        })
    }
})