const taskList = document.querySelector(".list-group");

const newTaskButton = document.querySelector("#new-task");
const closeButton = document.querySelector(".cancel");
const cardBody = document.querySelector(".card-body");
const table = document.querySelector(".content-table");
const title = document.querySelector("#tasks-title");
const popup = document.querySelector(".popup");
const inputTaskName = document.querySelector("#task-name");
const startDate = document.querySelector("#start-date");
//const endDate = document.querySelector("#end-date");
const inputStatus = document.querySelector("#status");
const priority = document.querySelector("#priority");
const completion = document.querySelector("#completion");
const taskForm = document.querySelector("#task-form");

//var myJsonObj = '[{"inputTaskName:"analiz","startDate":"2021-10-11"}]';
//var jsObj = JSON.parse(myJsonObj);


console.log(getTasksFromStorage());
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
    taskArray.push(taskObj);

    localStorage.tasksRecord = JSON.stringify(taskArray);
    prepareTableCell(_inputTaskName,_startDate,_inputStatus,_priority,_completion);


    
    popup.style.display = "none";
    //e.preventDefault();
}

    function addTask(e) {
        
        addTaskToUI(e);
        //addTaskToStorage(e);

        
        popup.style.display = "none";
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

    function prepareTableCell(_inputTaskName,_startDate,_inputStatus,_priority,_completion){ // Tablo hazırlar
        newRow = table.insertRow();
        cell1 = newRow.insertCell(0);
        cell2 = newRow.insertCell(1);
        cell3 = newRow.insertCell(2);
        cell4 = newRow.insertCell(3);
        cell5 = newRow.insertCell(4);
        cell6 = newRow.insertCell(5);
        cell7 = newRow.insertCell(6);

        cell1.innerHTML = inputTaskName.value;
        cell2.innerHTML = startDate.value;
        cell3.innerHTML = inputStatus.value;
        cell4.innerHTML = priority.value;
        cell5.innerHTML = "%"+completion.value;
        cell6.innerHTML = "<a type='button' class='text-primary'><i class='fa fa-edit'></i>Düzenle</a>";
        cell7.innerHTML = "<a type='button' class='text-danger'><i class='fa fa-trash'></i>Sil</a>";

        inputTaskName.value = "";
        startDate.value = "";
        inputStatus.value = "";
        priority.value = "";
        completion.value = "";
    }

    
        function loadAllTasksToUI() {
            // let tasksRecord = getTasksFromStorage();

            // tasksRecord.forEach(function(tasks) {
            //     addTaskToUI(tasks);
            // });

            if (localStorage.tasksRecord){
                taskArray= JSON.parse(localStorage.tasksRecord);
                for (var i = 0; i < taskArray.length; i++) {
                    // var gorev = taskArray[i].inputTaskName;
                    // var baslangıc  = taskArray[i].startDate;
                    // var durum = taskArray[i].inputStatus;
                    // var oncelik = taskArray[i].priority;
                    // var tamamlanma = taskArray[i].completion;

                    prepareTableCell(taskArray[i].inputTaskName,taskArray[i].startDate,taskArray[i].inputStatus,taskArray[i].priority,taskArray[i].completion);
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

