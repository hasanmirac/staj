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

eventListener();


function eventListener() { // Tüm event listenerlar
    newProjectButton.addEventListener("click",openForm);
    closeButton.addEventListener("click",closeForm);
    projectForm.addEventListener("submit",addProject);
    document.addEventListener("DOMContentLoaded",loadAllProjetsToUI); // Sayfa yüklendiğinde çalışacak
    cardBody.addEventListener("click",deleteProject);
    cardBody.addEventListener("click",updateProject);

}

// check for saved 'darkMode' in localStorage
let darkMode = localStorage.getItem('darkMode'); 

const darkModeToggle = document.querySelector('#dark-mode-toggle');

const enableDarkMode = () => {
  // 1. Add the class to the body
  document.body.classList.add('darkmode');
  // 2. Update darkMode in localStorage
  localStorage.setItem('darkMode', 'enabled');
}

const disableDarkMode = () => {
  // 1. Remove the class from the body
  document.body.classList.remove('darkmode');
  // 2. Update darkMode in localStorage 
  localStorage.setItem('darkMode', null);
}
 
// If the user already visited and enabled darkMode
// start things off with it on
if (darkMode === 'enabled') {
  enableDarkMode();
}

// When someone clicks the button
darkModeToggle.addEventListener('click', () => {
  // get their darkMode setting
  darkMode = localStorage.getItem('darkMode'); 
  
  // if it not current enabled, enable it
  if (darkMode !== 'enabled') {
    enableDarkMode();
  // if it has been enabled, turn it off  
  } else {  
    disableDarkMode(); 
  }
});


function closeForm() {
    popup.style.display = "none";
}
function openForm() {
    popup.style.display = "block";
}


function updateProject(index) {
    
        if (index.target.className === "fa fa-edit") {
        popup.style.display = "block";    
        // var projectObj = projectArray[index];
        var projectObj = [];
        // inputProject.value = projectObj.inputProject;
        console.log(JSON.parse(localStorage.getItem("projets")));
        projectObj  = JSON.parse(localStorage.getItem("projets"))
        console.log(projectObj[index])    
        //console.log(projectObj[index]);
        //console.log(projectObj[index]);
        // inputProject.textContent = e.target.parentElement.parentElement.textContent;
        // console.log(inputProject.textContent);
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
    console.log(deleteProject)
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
    
}


