const todoForm = document.getElementById('todo-form');
const todoInput = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');

// Initialize

const TODO_KEY = 'todoData'
let todoData = JSON.parse(localStorage.getItem(TODO_KEY)) || [];
todoData.map(printTodo);

// Event Listeners

todoForm.addEventListener('submit', handleTodoSubmit);

// Functions

function handleTodoSubmit(event) {
    event.preventDefault(); // 새로고침 방지
    const newTodo = {
        id: Date.now(),     // 현재 시간의 밀리초를 id로 사용
        text: todoInput.value,
    }
    todoInput.value = '';   // 입력창 초기화
    printTodo(newTodo);
    saveTodo(newTodo);
}

function printTodo (newTodo) {
    const li = document.createElement('li');
    const span = document.createElement('span');
    li.id = newTodo.id;
    span.innerText = newTodo.text;
    li.appendChild(span);
    todoList.appendChild(li);
}

function saveTodo (newTodo) {
    todoData.push(newTodo);
    localStorage.setItem(TODO_KEY, JSON.stringify(todoData));
}