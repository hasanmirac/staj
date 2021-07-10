// Elementleri Seçme
const projectForm = document.querySelector("#project-form");
const projectList = document.querySelector(".list-group");
const newProjectButton = document.querySelector(".btn-success");
const closeButton = document.querySelector(".cancel");
const deleteButton = document.querySelector("#delete-project");
const popup = document.querySelector(".popup");
const inputProject = document.querySelector("#project");

eventListener();


function eventListener() { // Tüm event listenerlar
    newProjectButton.addEventListener("click",openForm);
    closeButton.addEventListener("click",closeForm);
    projectForm.addEventListener("submit",addProject);

}

function closeForm() {
    popup.style.display = "none";
}
function openForm() {
    popup.style.display = "block";
}

function addProject(e) {
    const newProject = inputProject.value.trim();
    
    addProjectToUI(newProject); // Değeri arayüze gönderme


    e.preventDefault();
}

function addProjectToUI(newProject) { // String değerini list item olarak UI'ya ekler
    // List item oluşturma
    const listItem = document.createElement("li");
    // Link oluşturma
    const link = document.createElement("a");
    link.href = "#";  
    link.className = "edit-item";
    link.innerHTML = "<i class = 'fa fa-edit'></i>";

    listItem.className = "list-group-item d-flex justify-content-between";

    // Text Node Ekleme
    listItem.appendChild(document.createTextNode(newProject));
    listItem.appendChild(link);

    //- Todo List'e List Item'ı ekleme
    projectList.appendChild(listItem);
    inputProject.value = "";
    popup.style.display = "none";
}


