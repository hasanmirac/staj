// Elementler
const taskList = document.querySelector(".list-group");
const newTaskButton = document.querySelector("#new-task");
const closeButton = document.querySelector(".cancel");
const cardBody = document.querySelector(".card-body");
const table = document.querySelector(".content-table");
const tableBody = document.querySelector("#table-data");
const taskTitle = document.querySelector("#tasks-title");
const popup = document.querySelector(".popup");
const title = document.querySelector("#tasks-title");
const inputTaskName = document.querySelector("#task-name");
const startDate = document.querySelector("#start-date");
const inputStatus = document.querySelector("#status");
const priority = document.querySelector("#priority");
const completion = document.querySelector("#completion");
const taskForm = document.querySelector("#task-form");

// console.log(JSON.parse(localStorage.getItem("tasksRecord"))[0])
// var tasksRecord_serilezed = JSON.stringify(localStorage.tasksRecord);
// for(let a of tasksRecord_serilezed ) {
//     console.log(a.inputTaskName)
//}
// console.log(tasksRecord_serilezed)
// (JSON.parse(localStorage.tasksRecord)) 
//     if(tasksRecord.inputTaskName === "Analiz")
//         console.log(JSON.parse(localStorage.tasksRecord))
// sortTable(table,1)
// var obj = (JSON.parse(localStorage.tasksRecord))
// console.log(obj.startDate)
// console.log(JSON.parse(localStorage.tasksRecord))
// console.log( JSON.parse(localStorage.tasksRecord))
// const sort = document.querySelector("table thead tr .date");
// sort.addEventListener("click",sortting);
// function sortting () {

// }
// function sortTable(tables, column, asc = true){
//     const dirModifier = asc ? 1 : -1;
//     tableBody = tables.tBodies[0];
//     const rows = Array.from(tableBody.querySelectorAll("tr"));
//     //const rows = JSON.parse(localStorage.getItem("tasksRecord"))

//     const sortedRows = rows.sort((a,b) => {
//         const aColText = a.querySelector(`td:nth-child(${column + 1})`).textContent.trim();
//         const bColText = b.querySelector(`td:nth-child(${column+1})`).textContent.trim();
        
//         return aColText > bColText ? (1 * dirModifier) : (-1 * dirModifier);
//     });
//     console.log(sortedRows)
// }

// sortTable(table,1);




eventListener();
var taskArray = [];

function eventListener() {
    newTaskButton.addEventListener("click",openForm);
    closeButton.addEventListener("click",closeForm);
    document.addEventListener("DOMContentLoaded",loadAllTasksToUI); // Sayfa yüklendiğinde çalışacak
    taskForm.addEventListener("submit",addTask);
    
}

// localStorage'da kaydedilmiş karanlık modu konrol eder
let darkMode = localStorage.getItem('darkMode'); 

const darkModeToggle = document.querySelector('#dark-mode-toggle');

const enableDarkMode = () => {
  // darkmode u ekler
    document.body.classList.add('darkmode');
  // localStorge da darkmode u günceller 
    localStorage.setItem('darkMode', 'enabled');
}

const disableDarkMode = () => {
  // darkmode u kaldırır
    document.body.classList.remove('darkmode');
  // localStorge da darkmode u günceller  
    localStorage.setItem('darkMode', null);
}

// sayfa yenilendiğinde darkmode a göre başlar
if (darkMode === 'enabled') {
    enableDarkMode();
}

darkModeToggle.addEventListener('click', () => {
  // darkMode u oku
    darkMode = localStorage.getItem('darkMode'); 

  // etkinleştirme
    if (darkMode !== 'enabled') {
    enableDarkMode();
  // etkinse kapat  
    } else {  
    disableDarkMode(); 
    }
});


function closeForm() {
    popup.style.display = "none";
}
function openForm() {
    popup.style.display = "block";
    clearPopup();
}

function addTaskToUI() { // Görev ekleme
        
        var project  = localStorage.getItem("proje");
        var _inputTaskName = inputTaskName.value;
        var _startDate = startDate.value;
        var _inputStatus = inputStatus.value;
        var _priority = priority.value;
        var _completion = completion.value;

        var taskObj = {project,inputTaskName:_inputTaskName,startDate:_startDate,inputStatus:_inputStatus,priority:_priority,completion:_completion};
        
        if (selectedIndex === -1) {
            taskArray.push(taskObj);
        } 
        else {
            taskArray.splice(selectedIndex,1,taskObj);
        }

        localStorage.tasksRecord = JSON.stringify(taskArray);

        //prepareTableCell(_inputTaskName,_startDate,_inputStatus,_priority,_completion);
        loadAllTasksToUI();
        clearPopup();
        
        popup.style.display = "none";
        
    }

    var selectedIndex = -1;
    function updateTask(index) {
        selectedIndex = index;
        document.querySelector("#save-task").innerHTML = "Güncelle";
        popup.style.display = "block";
        var taskObj = taskArray[index];

        inputTaskName.value = taskObj.inputTaskName;
        startDate.value = taskObj.startDate;
        inputStatus.value = taskObj.inputStatus;
        priority.value = taskObj.priority;
        completion.value = taskObj.completion;
    }

    function clearPopup() {
        selectedIndex = -1;
        inputTaskName.value = "";
        startDate.value = "";
        inputStatus.value = "Başlanmadı";
        priority.value = "Normal";
        completion.value = "";
        document.querySelector("#save-task").textContent = "Kaydet";
    }



    function addTask(e) {
        addTaskToUI(e);
        
        
        popup.style.display = "none";
        clearPopup();
        e.preventDefault();
    }

    function getTasksFromStorage() { //Storage dan taskları alma
        let tasksRecord;
        
        if(localStorage.getItem("tasksRecord") === null ){
            tasksRecord = [];
        }
        else {
            tasksRecord = JSON.parse(localStorage.getItem("tasksRecord"));
        }
        
        return tasksRecord;
    }


    function prepareTableCell(index,inputTaskName,startDate,inputStatus,priority,completion){ // Tablo hazırlar
        newRow = tableBody.insertRow();
        cell1 = newRow.insertCell(0);
        cell2 = newRow.insertCell(1);
        cell3 = newRow.insertCell(2);
        cell4 = newRow.insertCell(3);
        cell5 = newRow.insertCell(4);
        cell6 = newRow.insertCell(5);
        cell7 = newRow.insertCell(6);
        cell8 = newRow.insertCell(7);
        cell9 = newRow.insertCell(8);
        cell10 = newRow.insertCell(9);
        cell11 = newRow.insertCell(10);

        cell1.innerHTML = inputTaskName;
        cell2.innerHTML = startDate;
        cell3.innerHTML = inputStatus;
        cell4.innerHTML = priority;
        cell5.innerHTML = "%"+completion;
        cell6.innerHTML = "<a type='button' class='text-primary' onclick='updateTask("+index+")'><i class='fa fa-edit'>Düzenle</i></a>";
        cell7.innerHTML = "<a type='button' class='text-danger' onclick='deleteTask("+index+")'><i class='fa fa-trash'>Sil</i></a>";

        inputTaskName.value = "";
        startDate.value = "";
        inputStatus.value = "";
        priority.value = "";
        completion.value = "";
    }

    function deleteTask(index) {

            taskArray.splice(index,1);
            localStorage.tasksRecord = JSON.stringify(taskArray);
            loadAllTasksToUI();
        
    }


    
    function loadAllTasksToUI() { //Görevleri UI a yükleme
            
            taskTitle.innerHTML = ""+localStorage.proje+" Görevleri";
            tableBody.innerHTML = "";

            if (localStorage.tasksRecord){
                taskArray= JSON.parse(localStorage.tasksRecord)
                for (var i = 0; i < taskArray.length; i++) {
                    if (taskArray[i].project === localStorage.proje)
                        prepareTableCell(i,taskArray[i].inputTaskName,taskArray[i].startDate,taskArray[i].inputStatus,taskArray[i].priority,taskArray[i].completion);
                }
            }
    }
    
    function addTaskToStorage(taskArray) {
        let tasksRecord = getProjetsFromStorage();

        tasksRecord.push(taskArray);

        localStorage.setItem("tasksRecord",JSON.stringify(tasksRecord));
    }

    $('th').on('click',function(){
        var column = $(this).data("column");
        var order = $(this).data("order");
        console.log("Column was cliked!", column , order);

        if(order == 'desc'){
            $(this).data('order' , "asc")
            JSON.parse(localStorage.tasksRecord) = JSON.parse(localStorage.tasksRecord).sort((a,b) => a[column] > b[column] ? 1 : -1 )
        } else{
            $(this).data('order', "desc")
            tasksRecord  = JSON.parse(localStorage.tasksRecord).sort((a,b) => a[column] < b[column] ? 1 : -1 )
        }
        loadAllTasksToUI();
    })
    // console.log(JSON.parse(localStorage.tasksRecord)).sort

    
    // console.log(JSON.parse(localStorage.getItem("tasksRecord")));
    // console.log(localStorage.tasksRecord)
    
