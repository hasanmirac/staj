// Elementleri Seçme
const projectForm = document.querySelector("#project-form");
const projectList = document.querySelector(".list-group");
const projectButton = document.querySelector("#new-project");


eventListener();

function eventListener() { // Tüm event listenerlar
    projectButton.addEventListener("click",newProject);
    
}   


function newProject(e) {
    document.querySelector(".popup").style.display = "flex";
}