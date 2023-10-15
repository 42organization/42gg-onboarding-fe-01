const todoForm = document.getElementById("todoForm");
const todoInput = todoForm.querySelector('input');
const todos = document.getElementById("todos");

const TODOLIST = "todoList";
let todoList = [];

function init() {
    loadTodoList();
    todoForm.addEventListener("submit", createTodo);
}

function makeDone(event){
    event.preventDefault();
    if (event.target.tagName === 'LI'){
        const parent = event.target;
        const index = todoList.findIndex((todo) => todo.id === Number(parent.id));
        
        todoList[index].isDone = !todoList[index].isDone;
        if (todoList[index].isDone)
            parent.classList.add("completed");
        else
            parent.classList.remove("completed");

        localStorage.setItem(TODOLIST, JSON.stringify(todoList));
    }

    if (event.target.tagName === "SPAN" ) {
        const parent = event.target.parentNode;
        const index = todoList.findIndex((todo) => todo.id === Number(parent.id));
        
        todoList[index].isDone = !todoList[index].isDone;
        if (todoList[index].isDone)
            parent.classList.add("completed");
        else
            parent.classList.remove("completed");

        localStorage.setItem(TODOLIST, JSON.stringify(todoList));
    }
}

function saveTodo(todo, isDone) {
    const todoObj = {
        text: todo,
        id: todoList.length + 1,
        isDone: isDone,
    }
    todoList.push(todoObj);
    localStorage.setItem(TODOLIST, JSON.stringify(todoList));
}

function loadTodoList(){
    const loadedTodoList = localStorage.getItem(TODOLIST);
    if (loadedTodoList !== null){
        const parseTodoList = JSON.parse(loadedTodoList);
        for(let todo of parseTodoList) {
            const {text} = todo;// const text = todo.text;
            const {isDone} = todo;
            paintTodo(text, isDone);
            saveTodo(text, isDone);
        }
    }
}
init();

function createTodo(event){
    event.preventDefault();
    const todo = todoInput.value;
    paintTodo(todo);
    saveTodo(todo);
    todoInput.value = "";
}

function delTodo(event){
    const { target:button } = event;
    const li = button.parentNode;
    todos.removeChild(li);
    todoList = todoList.filter((todo) => todo.id !== Number(li.id));
    localStorage.setItem(TODOLIST, JSON.stringify(todoList));
}

function uptTodo(event){
    const parent = event.target.parentNode;
    const span = parent.querySelector('span');
    const input = parent.querySelector('input');

    if (input.style.display === 'none' || input.style.display === '') {
        span.style.display = 'none';
        input.style.display = 'inline-block';
        input.value = span.textContent;
    } else {
        span.textContent = input.value;
        span.style.display = 'inline-block';
        input.style.display = 'none';

        const parent = event.target.parentNode;
        const index = todoList.findIndex((todo) => todo.id === Number(parent.id));
        
        todoList[index].text = input.value;
        localStorage.setItem(TODOLIST, JSON.stringify(todoList));
    }
}

function paintTodo(todo, isDone) {
    const li = document.createElement("li")
    const span = document.createElement("span");
    const delButton = document.createElement("button");
    const uptButton = document.createElement("button");
    const uptInput = document.createElement("input");
        
    li.addEventListener("click", makeDone);
    delButton.addEventListener("click", delTodo);
    uptButton.addEventListener("click", uptTodo);
    span.innerText = todo;
    delButton.innerText = "삭제";
    uptButton.innerText = "수정";
    
    li.classList.add("todo-item");
    span.classList.add("todo-text");
    uptInput.classList.add("edit-input")
    
    li.appendChild(span);
    li.appendChild(uptInput);
    li.appendChild(delButton);
    li.appendChild(uptButton);
    li.id = todoList.length + 1;

    if (isDone) {
        li.classList.add("completed");
        span.classList.add("completed");
    }

    todos.appendChild(li);
}