// Elementleri Seçme
const projectForm = document.querySelector("#project-form");
const projectList = document.querySelector(".list-group");
const newProjectButton = document.querySelector("#new-project");
const closeButton = document.querySelector(".cancel");
const deleteButton = document.querySelector("#delete-project");
const popup = document.querySelector(".popup");
const inputProject = document.querySelector("#project");
const homePopup = document.querySelector("#home-popup");
const cardBody = document.querySelector(".card-body");

console.log(getProjetsFromStorage());
eventListener();


function eventListener() { // Tüm event listenerlar
    newProjectButton.addEventListener("click",openForm);
    closeButton.addEventListener("click",closeForm);
    projectForm.addEventListener("submit",addProject);
    document.addEventListener("DOMContentLoaded",loadAllProjetsToUI); // Sayfa yüklendiğinde çalışacak
    cardBody.addEventListener("click",deleteProject);
    cardBody.addEventListener("click",updateProject);

}

function closeForm() {
    popup.style.display = "none";
}
function openForm() {
    popup.style.display = "block";
}


function updateProject(index) {

    
    if (index.target.className === "fa fa-edit") {
        console.log("aa")
        popup.style.display = "block";
        let webtask = localStorage.getItem("projets");
        let taskObj = JSON.parse(webtask);
        
        inputProject.value = taskObj[index];
        console.log(taskObj[index]);
        console.log(taskObj);
        // inputProject.textContent = e.target.parentElement.parentElement.textContent;
        // console.log(inputProject.textContent);
        // //inputProject.  = inputProject.textContent
    }
}

function deleteProject(e) {

    if (e.target.className === "fa fa-remove") {
        
        e.target.parentElement.parentElement.remove();
        deleteProjectFromStorage(e.target.parentElement.parentElement.textContent);
        showAlertHome("success","Silme işlemi başarılı")
    }
    
}

function deleteProjectFromStorage(deleteProject) { //Projeleri Storagedan silme
    let projects = getProjetsFromStorage();

    projects.forEach(function(project,index) {
        if (project === deleteProject) {
            projects.splice(index,1); // Arrayden değeri siler
        }
        
        localStorage.setItem("projets",JSON.stringify(projects));
    });

}

function loadAllProjetsToUI() {
    let projects = getProjetsFromStorage();

    projects.forEach(function(project) {
        addProjectToUI(project);
    });
}

function addProject(e) {
    const newProject = inputProject.value.trim();
    
    if(newProject === "") {
        showAlert("danger","Lütfen bir proje giriniz...");
    } 
    else {
        addProjectToUI(newProject); // Değeri arayüze gönderme
        addProjectToStorage(newProject); // Değeri storage'a gönderme
        showAlert("success","Proje başarıyla eklendi...");
        setTimeout(() => {
            popup.style.display = "none";
        }, 1000); 
    }
    e.preventDefault();
}

function getProjetsFromStorage() { // Storage'dan tüm projeleri alma
    let projects;

    if (localStorage.getItem("projets") === null) {
        projects = [];
    }
    else {
        projects = JSON.parse(localStorage.getItem("projets"));
    }

    return projects;
}

function addProjectToStorage(newProject) {
    let projects = getProjetsFromStorage();

    projects.push(newProject);

    localStorage.setItem("projets",JSON.stringify(projects));

}

function showAlert(type,message) { //popup'da görünecek
    const alert = document.createElement("div");
    alert.className = `alert alert-${type}`;
    alert.textContent = message;

    homePopup.appendChild(alert); //popup'da görünecek
    

    setTimeout(function(){ // belirli süre görünüp kaybolacak
        alert.remove();
    },1000); 
    
}

function showAlertHome(type,message) { //home'da görünecek
    const alert = document.createElement("div");
    alert.className = `alert alert-${type}`;
    alert.textContent = message;

    
    cardBody.appendChild(alert); // anasayfa'da görünecek

    setTimeout(function(){ // belirli süre görünüp kaybolacak
        alert.remove();
    },1000); 
    
}



function addProjectToUI(newProject) { // String değerini list item olarak UI'ya ekler
    // List item oluşturma
    const listItem = document.createElement("li");
    // Link oluşturma
    const link = document.createElement("a");
    link.href = "#";  
    link.className = "edit-item";
    link.innerHTML = "<i class = 'fa fa-edit' ></i>";
    const link2 = document.createElement("a");
    link2.href = "#";  
    link2.className = "remove-item";
    link2.innerHTML = "<i class ='fa fa-remove'></i>";


    listItem.className = "list-group-item d-flex justify-content-between";



    const gorevler = document.createElement("a");
    gorevler.appendChild(document.createTextNode(newProject));
    gorevler.href = "task.html";
    
    gorevler.onclick = function(){
        window.localStorage.proje = newProject; 
    }


    // Text Node Ekleme
    listItem.appendChild(gorevler);
    listItem.appendChild(link);
    listItem.appendChild(link2);
    
    //- Todo List'e List Item'ı ekleme
    projectList.appendChild(listItem);
    inputProject.value = "";
    //popup.style.display = "none";
}
 
/*

    listItem.className = "list-group-item d-flex justify-content-between";



    const gorevler = document.createElement("a");
    gorevler.appendChild(document.createTextNode(newProject));
    gorevler.href = "task.html";

    gorevler.onclick = function(){
        window.localStorage.proje = newProject; 
    }
    // Text Node Ekleme
    listItem.appendChild(gorevler);
    listItem.appendChild(link);
    listItem.appendChild(link2);


*/

