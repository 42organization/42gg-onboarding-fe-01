const todoForm = document.getElementById("todoForm");
const todoInput = todoForm.querySelector('input');
const todos = document.getElementById("todos");

const TODOLIST = "todoList";
let todoList = [];

function init() {
    loadTodoList();
    todoForm.addEventListener("submit", createTodo);
}

function saveTodo(todo) {
    const todoObj = {
        text: todo,
        id: todoList.length + 1,
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
            paintTodo(text);
            saveTodo(text);
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
    console.log(li);
    console.log(todoList);
    todos.removeChild(li);
    todoList = todoList.filter((todo) => todo.id !== Number(li.id));
    localStorage.setItem(TODOLIST, JSON.stringify(todoList));
}

function paintTodo(todo) {
    const li = document.createElement("li");
    const span = document.createElement("span");
    const delButton = document.createElement("button");
    delButton.innerText = "Del";
    delButton.addEventListener("click", delTodo);
    span.innerText = todo;
    li.appendChild(span);
    li.appendChild(delButton);
    li.id = todoList.length + 1;
    todos.appendChild(li);
}