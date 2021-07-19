const taskList = document.querySelector(".list-group");

const newTaskButton = document.querySelector("#new-task");
const closeButton = document.querySelector(".cancel");
const cardBody = document.querySelector(".card-body");
const table = document.querySelector(".content-table");
const tableBody = document.querySelector("#table-data");
const title = document.querySelector("#tasks-title");
const popup = document.querySelector(".popup");
const inputTaskName = document.querySelector("#task-name");
const startDate = document.querySelector("#start-date");
//const endDate = document.querySelector("#end-date");
const inputStatus = document.querySelector("#status");
const priority = document.querySelector("#priority");
const completion = document.querySelector("#completion");
const taskForm = document.querySelector("#task-form");



eventListener();
var taskArray = [];


function eventListener() {
    newTaskButton.addEventListener("click",openForm);
    closeButton.addEventListener("click",closeForm);
    document.addEventListener("DOMContentLoaded",loadAllTasksToUI); // Sayfa yüklendiğinde çalışacak
    taskForm.addEventListener("submit",addTask);
    
}

function closeForm() {
    popup.style.display = "none";
}
function openForm() {
    popup.style.display = "block";
    clearPopup();
}


function addTaskToUI() {

//     const tablerow = document.createElement('tr');
//     const tabledata = document.createElement("td");
//     const edit = document.createElement("a");
//     const remove = document.createElement("a");

//     edit.href = "#";
//     edit.className = "edit-item";
//     edit.innerHTML = "<i class='fa fa-edit'></i>";

//     remove.href = "#";
//     remove.className = "remove-item";
//     remove.innerHTML = "<i class='fa fa-trash'></i>";

//     tablerow.appendChild(document.createTextNode(newTask));
//     tablerow.appendChild(tabledata);
//     tablerow.appendChild(edit);
//     tablerow.appendChild(remove);

//     taskList.appendChild(tablerow);
    
//     // const newTask = task.value;
//      console.log(newTask);

//    e.preventDefault();

/*
    let taskData = [
        { name : inputTaskName.value , startDate : startDate.value, status : status.value , priority : priority.value , completion: completion.value   },
        { name : inputTaskName.value , startDate : startDate.value, status : status.value , priority : priority.value , completion: completion.value   },
        { name : inputTaskName.value , startDate : startDate.value, status : status.value , priority : priority.value , completion: completion.value   },
        { name : inputTaskName.value , startDate : startDate.value, status : status.value , priority : priority.value , completion: completion.value   },

    ];

    window.onload = () => {
        loadTableData(taskData);
        
    };

    function loadTableData(taskData) {
        const tableBody = document.querySelector("#table-data");
        let taskHtml = '' ;

        for(let task of taskData) {
            taskHtml += `<tr>
            <td>${task.name}</td>
            <td>${task.startDate}</td>
            <td>${task.status}</td>
            <td>${task.priority}</td>
            <td>%${task.completion}</td>
            <td><a type="button" class="text-primary"><i class="fa fa-edit"></i>Düzenle</a></td>
            <td><a type="button" class="text-danger"><i class="fa fa-trash"></i>Sil</a></td>
            </tr>`;
        }
        
        tableBody.innerHTML = taskHtml;
        
    }

    loadTableData(taskData);

    popup.style.display = "none"    
    newTask.preventDefault();
    */
        
        var _inputTaskName = inputTaskName.value;
        var _startDate = startDate.value;
        var _inputStatus = inputStatus.value;
        var _priority = priority.value;
        var _completion = completion.value;

        var taskObj = {inputTaskName:_inputTaskName,startDate:_startDate,inputStatus:_inputStatus,priority:_priority,completion:_completion};
        
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
        
        //e.preventDefault();
    }

    var selectedIndex = -1;
    function updateTask(index) {
        selectedIndex = index;
        console.log(index)
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
        //selectedIndex = -1;
        inputTaskName.value = "";
        startDate.value = "";
        inputStatus.value = "Başlanmadı";
        priority.value = "Normal";
        completion.value = "";
        document.querySelector("#save-task").textContent = "Kaydet";
    }



    function addTask(e) {
        addTaskToUI(e);
        //addTaskToStorage(e);

        
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

    
    

    // function getTasksFromStorage() {
    //     let tasks;

    //     if(localStorage.getItem("tasks") === null ){
    //         tasks = [];
    //     }
    //     else {
    //         tasks = JSON.parse(localStorage.getItem("tasks"));
    //     }
    //     return tasks;
    // }

    // function addTaskToStorage() {
    //     let tasks = getTasksFromStorage();

    //     if (localStorage.tasksRecord){
    //         taskArray= JSON.parse(localStorage.tasksRecord);
    //         for (var i = 0; i < taskArray.length; i++) {
    //             // var gorev = taskArray[i].inputTaskName;
    //             // var baslangıc  = taskArray[i].startDate;
    //             // var durum = taskArray[i].inputStatus;
    //             // var oncelik = taskArray[i].priority;
    //             // var tamamlanma = taskArray[i].completion;

    //             prepareTableCell(taskArray[i].inputTaskName,taskArray[i].startDate,taskArray[i].inputStatus,taskArray[i].priority,taskArray[i].completion);
    //         }
    //     }

    //     // tasks.push(newTask);

    //     // localStorage.setItem("tasks",JSON.stringify(tasks));
    // }

    function prepareTableCell(index,inputTaskName,startDate,inputStatus,priority,completion){ // Tablo hazırlar
        newRow = tableBody.insertRow();
        cell1 = newRow.insertCell(0);
        cell2 = newRow.insertCell(1);
        cell3 = newRow.insertCell(2);
        cell4 = newRow.insertCell(3);
        cell5 = newRow.insertCell(4);
        cell6 = newRow.insertCell(5);
        cell7 = newRow.insertCell(6);

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

        //console.log(e.target);
        // if(e.target.className == "fa fa-trash"){
        //     e.target.parentElement.parentElement.parentElement.remove();
        //     deleteTaskFromStorage(e.target.parentElement.parentElement.parentElement.textContent);
        //     console.log(e.target.parentElement.parentElement.parentElement.textContent);
            // taskArray.splice(index,1);
            // localStorage.tasksRecord = JSON.stringify(taskArray);
            // loadAllTasksToUI();
            //table.deleteRow(index+1); gerek yok
            taskArray.splice(index,1);
            localStorage.tasksRecord = JSON.stringify(taskArray);
            loadAllTasksToUI();
        //}
        // if (e.target.className == "text-danger") {
        //     e.target.parentElement.parentElement.remove();
        //     console.log(e.target)
        //     console.log(e.target.parentElement.textContent)
        //     console.log(e.parentElement.parentElement);
        //     console.log(e.target.parentElement.parentElement.textContent);
            
        // }
    }

    function deleteTaskFromStorage(deleteTask) { //Projeleri Storagedan silme
        let tasks = getTasksFromStorage();
        
        tasks.forEach(function(task,index) {
            // if (task === deleteTask) {
            //     console.log("silme işlemi")
            //     tasks.splice(index,1); // Arrayden değeri siler
            // }
            console.log(task)
            localStorage.getItem("tasksRecord")
            //localStorage.setItem("tasksRecord",JSON.stringify(tasksRecord));
        });
    
    }


    
    function loadAllTasksToUI() {
            // let tasksRecord = getTasksFromStorage();

            // tasksRecord.forEach(function(tasks) {
            //     addTaskToUI(tasks);
            // });
            tableBody.innerHTML = "";

            if (localStorage.tasksRecord){
                taskArray= JSON.parse(localStorage.tasksRecord);
                for (var i = 0; i < taskArray.length; i++) {
                    prepareTableCell(i,taskArray[i].inputTaskName,taskArray[i].startDate,taskArray[i].inputStatus,taskArray[i].priority,taskArray[i].completion);
                }
            }
    }

    function addTaskToStorage(taskArray) {
        let tasksRecord = getProjetsFromStorage();

        tasksRecord.push(taskArray);

        localStorage.setItem("tasksRecord",JSON.stringify(tasksRecord));
    }


    

    //addTaskToUI(a);

    // console.log(newPriority)

    // addTaskToUI(newTaskName);
    // addTaskToUI(newStartDate);
    
    // var newRow = table.insertRow(row);

    // var cell1 = newRow.insertCell(0);
    // var cell2 = newRow.insertCell(1);
    // var cell3 = newRow.insertRow(2);

    // cell1.innerHTML = newTaskName;
    // cell2.innerHTML = newStartDate;

    // row++

