const newTaskBtn = document.getElementById("new-task");
const addTaskBtn = document.getElementById("submit-task");
const goBackBtn = document.getElementById("discard");
const editorBtn = document.getElementById("editor-button");
const subHeading = document.getElementById("sub-heading");
const currentTask = document.getElementById("new-task-info");
const addTaskScreen = document.getElementById("add-task-screen");
let taskTitle = document.getElementById("task-title");
let textInput = document.getElementById("text");
let ongoingTasks = document.getElementById("ongoing-tasks");
let allTasks = document.getElementById("all-tasks");
let userList = document.getElementById("userList");
let list = document.querySelectorAll(".list");
const editBtns = document.querySelectorAll(".edit");
const delBtns = document.querySelectorAll(".delete");
let tasksNum = document.getElementById("tasksNum");

const allTasksInfo = [];    //all task info to be stored here
let taskNames = [...new Set(allTasksInfo.flatMap((o) => [o.title]))];
let tasksCount = 1;
let idCount = 1;    //manages individual id's for tasks and children of tasks
let editCurrentTask = false;
let createListItem = false;
let newTaskInfo = {};
tasksNumVal = Math.max(0, 0);
tasksNum.innerText = tasksNumVal;


//takes the user to the add-task screen---
  addTaskScreen.style.display = "none";

  newTaskBtn.addEventListener("click", () => {
    
    addTaskScreen.style.display = "block";
    newTaskBtn.style.display = "none";
    addTaskBtn.style.display = "block";
    addTaskBtn.style.backgroundColor = "#77B254";
    editorBtn.style.display = "none";
    document.getElementById("bottom-half").style.display = "none";
});


//takes the info the user inputs and sends it to the main tasks screen---
addTaskBtn.addEventListener("click", () => {
  
  for (let i = 0; i < idCount; i++) {
    
    let alertVal = false;
    editCurrentTask = false
    
     if (taskTitle.value == "") {
       if (!alertVal) {
          alert("Please put a valid title");
          alertVal = true;
       }
      return;
    } else if (!editCurrentTask) {
    //adds a new task to the ToDo list and shows the title of the task as the header, also creates a p textContent for the textarea value
    newTaskInfo["id"] = JSON.stringify(idCount);
    newTaskInfo["title"] = taskTitle.value;
    newTaskInfo["task"] = textInput.value;
      allTasksInfo.push(newTaskInfo);
    
    
  //adds an edit button to the newly created task
  let editBtn = document.createElement("button");
  editBtn.classList.add("edit");
  editBtn.classList.add("fas", "fa-edit");

  //adds a delete button to the newly created task
  let delBtn = document.createElement("button");
  delBtn.classList.add("delete");
  delBtn.classList.add("far", "fa-trash-alt");
    
    //creates a new li element that gets put into the existing ul block
    let newListItem = document.createElement("li");
    let newListContent = document.createElement("span");
    let newListTitle = document.createTextNode(taskTitle.value);
    let newListContentVal = document.createTextNode(textInput.value);
        newListItem.classList.add("list");
        newListItem.setAttribute("id", JSON.stringify(idCount));
        newListContent.appendChild(newListContentVal);
        newListItem.appendChild(newListTitle);
        editBtn.setAttribute("id", newListItem.id);  //adds edit button unique to the task created
        delBtn.setAttribute("id", newListItem.id);   //adds del button
        newListItem.appendChild(editBtn);
        newListItem.appendChild(delBtn);
          userList.appendChild(newListItem);  //adds newly created li to the ul
      
    //deletes a task when prompted
   delBtn.onclick = function deleteItem() {
    let parent = document.getElementById("userList");
        parent.removeChild(document.getElementById(delBtn.id));
          allTasksInfo.splice(allTasksInfo.indexOf(delBtn.id), 1);
          tasksNumVal -= 1;
          tasksNum.innerText = tasksNumVal;
    }

    //edits an existing task with onclick to update a task. it creates a new li with info and removes the existing one. 
    editBtn.onclick = function editItem() {
 
     editCurrentTask = true;
    //allows for editing 
      for (let i = 0; i < allTasksInfo.length; i++) {
        
        Object.entries(allTasksInfo[i]).forEach(([key, value]) => {    
          
        if (editCurrentTask = true && value == editBtn.id && allTasksInfo[i].id == newListItem.id) {
           addTaskScreen.style.display = "block";
           newTaskBtn.style.display = "none";
           document.getElementById("bottom-half").style.display = "none";
           addTaskBtn.style.backgroundColor = "#A1EEBD";
           subHeading.textContent = "Edit task information: "
           taskTitle.value = allTasksInfo[i].title;
           textInput.value = allTasksInfo[i].task;
          
          let newListContent = document.createElement("span");
          let newListTitle = document.createTextNode(taskTitle.value);
          let newListContentVal = document.createTextNode(textInput.value);
              newListItem.classList.add("list");
              newListItem.setAttribute("id", JSON.stringify(idCount));
              newListContent.appendChild(newListContentVal);
              newListItem.appendChild(newListTitle);
              editBtn.setAttribute("id", newListItem.id);
              delBtn.setAttribute("id", newListItem.id);
              newListItem.appendChild(editBtn);
              newListItem.appendChild(delBtn);
                userList.appendChild(newListItem);
          
          let parent = document.getElementById("userList");
              parent.removeChild(document.getElementById(editBtn.id));  //removes old li item and replaces it with new one
              tasksNumVal -= 1;
            } else {              
              editCurrentTask = false;
              return;
            }
          });
        }
      }     
    }
      //takes the user back to the tasks/list screen to add, edit or delete as they see fit
      addTaskScreen.style.display = "none";
      newTaskBtn.style.display = "block";
      document.getElementById("bottom-half").style.display = "block";
      idCount++;    //increases idCount by one ready for the next task
      tasksCount++;
      subHeading.textContent = "Add new task: "
      newTaskInfo = {};
      updateTaskInfo = {};
      taskTitle.value = "";
      textInput.value = "";
      createListItem = false;
      tasksNumVal += 1;
      tasksNum.innerText = tasksNumVal;
    }     
 });


//resets the page do the user can add, edit or delete tasks
function reset() {
    addTaskScreen.style.display = "none";
    newTaskBtn.style.display = "block";
    document.getElementById("bottom-half").style.display = "block";
    taskTitle.value = "";
    textInput.value = "";
    editCurrentTask = false;
}

function editor() {
    addTaskScreen.style.display = "none";
    newTaskBtn.style.display = "block";
    document.getElementById("bottom-half").style.display = "block";
    let newTextVal = textInput.value;
    textInput.value = newTextVal;
}
