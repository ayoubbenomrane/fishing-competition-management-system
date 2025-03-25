import { getJoueurs, addPlayer, deletePlayer, updatePlayer } from "./api.js";
const listeJoueur = document.getElementById("liste-joueur");

const deleteIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
  <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
  <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
</svg>`

const updateIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-fill" viewBox="0 0 16 16">
  <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.5.5 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11z"/>
</svg>`

async function loadJoueurs() {
    try {
        listeJoueur.innerHTML = "";
        const joueursData = await getJoueurs();
        for (const joueur of joueursData) {
            // console.log(joueur)
            const joueurCard = document.createElement("div");
            joueurCard.className = "col-md-4 mb-4";
            joueurCard.innerHTML = `
                        <div class="card d-flex flex-row ">
                            <div class="card-body d-flex">
                                <img src="../assets/profile_pictures/${joueur.profile_picture}"
                                     class="rounded-circle me-3" 
                                     alt="${joueur.name}"
                                     style="width: 100px; height: 100px; object-fit: cover;">
                                <div>
                                    <div class="d-flex justify-content-between">
                                        <h5 class="card-title">${joueur.name}</h5>
                                        
                                    </div>
                                    <p class="card-text mb-1">
                                        <i class="bi bi-calendar"></i>
                                        Date de naissance: ${joueur.birthdate.split("T")[0]}
                                    </p>
                                    <p class="card-text">
                                        <i class="bi bi-telephone"></i>
                                        Numéro de téléphone: ${joueur.phone_number}
                                    </p>
                                </div>
                            </div>
                            <div class="p-1">
                                <button type="button" class="btn btn-warning" id="${joueur.id}" data-bs-toggle="modal" data-bs-target="#update-player-modal">${updateIcon}</button>
                                <button type="button" class="btn btn-danger" id="${joueur.id}" >${deleteIcon}</button>

                                            
                            </div>
                        </div>


           `;
            listeJoueur.appendChild(joueurCard);
        }

    }
    catch (error) {
        console.error(error)
    }


}
loadJoueurs();

const joueurForm = document.getElementById("player-form");
const modal = document.querySelector(".update-player");
const closeButton = document.querySelector(".close-button")
var update=false;
var button;

const addPlayerButton = document.getElementById("add-player-button")
addPlayerButton.addEventListener("click", async (event) => {
    update=false;
    modal.showModal();
    
})

document.addEventListener("click", async (event) => {

    if (event.target.closest(".btn-danger")) {
        console.log("yeaah buddy")
        const button = event.target.closest(".btn-danger")
        await deletePlayer(button.id)
        loadJoueurs();

    }
})

joueurForm.addEventListener("submit",async (event)=>{
    event.preventDefault();
    const formData= new FormData(joueurForm);
    const filteredData= new FormData()
    for(const pair of formData.entries()){
        if(pair[1] instanceof File && pair[1].name!='' ){
            console.log("yeet  ",pair[1].name)
            filteredData.append(pair[0],pair[1]);

        }
        else if (pair[1]!=''){
            filteredData.append(pair[0],pair[1]);
        }
    }
    for(const pair of filteredData){
        console.log(pair[0],pair[1])}

    // console.log(button.id)
    if(update){
    await updatePlayer(button.id,filteredData)}
    else {
        await addPlayer(filteredData)
    }
    loadJoueurs();
})
closeButton.addEventListener("click", () => {
    modal.close()
})
document.addEventListener("click", async (event) => {
    if (event.target.closest(".btn-warning")) {
        button = event.target.closest(".btn-warning"); // Get the closest button
        update=true;
        modal.showModal();
    }
})