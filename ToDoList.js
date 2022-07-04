// Select HTML Element
let taskInput = document.querySelector(".taskinput");
let submit = document.querySelector(".submit");
let taskList = document.querySelector(".tasklist");
let clear = document.querySelector(".clear");

// Icon Class
const CHECKED_ICON = 'fa-circle-check';
const UNCHECKED_ICON = 'fa-circle';
const DELETE_ICON = 'fa-solid fa-trash';

// Storage Varibles + Load Storage
let storage = JSON.parse(localStorage.getItem("storage")) || [ ];
let id = 0;
if (storage.length != 0) {
    id = JSON.parse(localStorage.getItem("storage")).length;
    loadStorage(storage);
};

function loadStorage(storage) {
    storage.forEach( item => {
        addToDo(item.task, item.id, item.check, item.trash);
    })
};

// Clear Local Storage
clear.addEventListener("click", () => {
    if(confirm("Delete All Tasks ?")) {
        taskList.innerHTML = "";
        localStorage.clear();
        location.reload();
    } else {
        return;
    }}
);

// Add to do + Save to local Storage
function addToDo(task, id, check, trash) {
    if (trash == true) {
        return;
    } else {
        let done = check ? CHECKED_ICON : UNCHECKED_ICON;
        let lineThrough = check ? "text-decoration: line-through" : "";
        let opacity = check ? "opacity: 0.5" : "opacity: 1";     
        let text = `
                    <li class="taskitems" id="${id}" style="${opacity}">
                        <button class="checkbox">
                            <i class="fa-regular ${done}" title="Check" id="${id}"></i>
                        </button>
                        <span class="task" style="${lineThrough}"> ${task} </span>
                        <button class="delete">
                            <i class="${DELETE_ICON}" title="Delete" id="${id}"></i>
                        </button>
                    </li>`;
        taskList.insertAdjacentHTML("afterbegin", text); 
    }
};        

submit.addEventListener("click", event => {
    event.preventDefault();
    task = taskInput.value,
    addToDo(task, id, false, false);
    // Save to Local Storage
    storage.push(
        {
            task: task,
            id: id,  
            check: false,
            trash: false         
        });
    localStorage.setItem("storage", JSON.stringify(storage)); 
    taskInput.value = "";
    id++; 
});    

// Target Task List Element
taskList.addEventListener("click", event => {
    let element = event.target;
    if (element.classList == DELETE_ICON) {
        deleteToDo(element);
    } else if (element.attributes.title.value == "Check") {
        clickCheckBox(element);
    } else {
        return;
    }}
);

// Delete To Do
function deleteToDo(element) {
    element.parentNode.parentNode.parentNode.removeChild(element.parentNode.parentNode);
    storage[element.id].trash = true;      
    localStorage.setItem("storage", JSON.stringify(storage));
};

// Click CheckBox
function clickCheckBox(element) {
    element.classList.toggle(CHECKED_ICON);
    element.classList.toggle(UNCHECKED_ICON);
    storage[element.id].check = storage[element.id].check ? false : true;
    // text-decoration for CSS, textDecoration for JS
    element.parentNode.nextElementSibling.style.textDecoration = storage[element.id].check ? "line-through" : "";
    element.parentNode.parentNode.style.opacity = storage[element.id].check ? 0.5 : 1;    
    localStorage.setItem("storage", JSON.stringify(storage));
};

/*
// Date
let date = document.querySelector(".date");
let dateOption = { weekday: "short", month: "short", day: "numeric"};
date.innerHTML = new Date().toLocaleDateString('en-GB', dateOption);


let time = document.querySelector(".time");
time.innerHTML = new Date().toLocaleTimeString('en-GB');
*/













/*





// Progree Bar 





// Event Listener
*/
