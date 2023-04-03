const todoForm = document.getElementById('todo-input');
const todoInput = document.querySelector('#todo-input input');
const todoList = document.querySelector('#todo-list');
const todoButton = document.querySelector('#todo-button');

const TODO_KEY = "todo";

let todo = [];

const savedTodo = localStorage.getItem(TODO_KEY);

// 로컬스토리지에 todo list 저장
function saveTodo(){
    localStorage.setItem(TODO_KEY, JSON.stringify(todo));
}

// 리스트 삭제
function deleteTodo(event){
    const delElement = event.target.parentElement.parentElement;
    todo = todo.filter((todo) => todo.id !== parseInt(delElement.id));
    delElement.remove();
    saveTodo();
}

// 리스트 체크
function checkTodo(event){
    const checkElement = event.target.parentElement.parentElement.querySelector("#textArea");
    if (checkElement.style.textDecoration == ""){
        checkElement.style.textDecoration = "line-through";
    } else {
        checkElement.style.textDecoration = "";
    }
}

// 스토리지 수정
function updateStorage(oldId, newText){
    todo = todo.map((item) => item.id == oldId ? { ...item, text: newText } :item);
    saveTodo();
}

function doUpdate(submitEvent, updateElementLi, updateInput, updateSubmit){
    submitEvent.preventDefault();
    console.log(updateInput.value);
    const oldId = updateElementLi.id;
    updateStorage(oldId, updateInput.value);
    updateElementLi.querySelector("#update").removeAttribute("disabled");
    updateInput.blur();
    updateInput.setAttribute("disabled", true);
}

// 리스트 수정
function updateTodo(event){
    const updateElementLi = event.target.parentElement.parentElement;
    const updateElementForm = updateElementLi.querySelector("#newForm");
    const updateInput = updateElementLi.querySelector("#textArea");
    const updateSubmit = updateElementLi.querySelector("#textSubmit");
    updateInput.removeAttribute("disabled");
    updateSubmit.type = "submit";
    updateInput.focus();
    const oldId = updateElementLi.id;
    event.target.setAttribute("disabled", true);
    console.log(updateElementForm);
    updateElementForm.addEventListener("submit", (submitEvent) => doUpdate(submitEvent, updateElementLi, updateInput, updateSubmit));
}

function displayTodo(newToDoObj){
    const newList = document.createElement("li");
    newList.id = newToDoObj.id;
    
    const newForm = document.createElement("form"); // 리스트 요소 폼
    newForm.id = "newForm";
    const newFormInput = document.createElement("input");
    newFormInput.setAttribute("disabled", true);
    newFormInput.id = "textArea";
    newFormInput.type = "text";
    newFormInput.value = newToDoObj.text;
    const newFormSubmit = document.createElement("input");
    newFormSubmit.id = "textSubmit";
    newFormSubmit.style = "display:none";
 
    const delButton = document.createElement("button"); // 삭제버튼
    delButton.innerText = "삭제";
    delButton.id = "delete";
    delButton.addEventListener("click", deleteTodo);
    const checkButton = document.createElement("button"); // 체크버튼
    checkButton.innerText = "체크";
    checkButton.id = "check";
    checkButton.addEventListener("click", checkTodo);
    const updateButton = document.createElement("button"); // 수정버튼
    updateButton.innerText = "수정";
    updateButton.id = "update";
    updateButton.addEventListener("click", updateTodo);
    const buttonBox = document.createElement("div"); // 버튼박스
    buttonBox.id = "buttons";

    newForm.appendChild(newFormInput);
    newForm.appendChild(newFormSubmit);
    newList.appendChild(newForm);

    buttonBox.appendChild(delButton);
    buttonBox.appendChild(checkButton);
    buttonBox.appendChild(updateButton);
    newList.appendChild(buttonBox);
    todoList.appendChild(newList);
}

function addInput(event){
    event.preventDefault();
    const newToDo = todoInput.value;
    todoInput.value = "";
    const newToDoObj = {
        text: newToDo,
        id: Date.now()
    }
    todo.push(newToDoObj);
    displayTodo(newToDoObj);
    saveTodo();
}

todoButton.addEventListener('click', addInput);

if (savedTodo !== null){
    const parsedTodo = JSON.parse(savedTodo);
    todo = parsedTodo;
    todo.forEach(displayTodo);
}