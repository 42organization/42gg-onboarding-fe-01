const todoForm = document.getElementById('todo-form');
const todoInput = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');

// Initialize

const TODO_KEY = 'todoData'
let todoData = JSON.parse(localStorage.getItem(TODO_KEY)) || [];
todoData.map(printTodo);

// Event Listeners

todoForm.addEventListener('submit', handleTodoSubmit);

// Event Handlers

function handleTodoSubmit(event) {
    event.preventDefault(); // 새로고침 방지
    const newTodo = {
        id: Date.now(),     // 현재 시간의 밀리초를 id로 사용
        text: todoInput.value,
    }
    todoInput.value = '';   // 입력창 초기화
    printTodo(newTodo);
    addTodo(newTodo);
}

function handleTodoDelete(event) {
    const targetId = event.target.parentElement.id;
    const li = event.target.parentElement; // 삭제할 li
    li.remove();    // 화면에서 삭제하기
    todoData = todoData.filter((todo) => { return (todo.id !== parseInt(targetId)); });
    saveTodo();
}

// Functions

function printTodo (newTodo) {
    const li = document.createElement('li');
    const span = document.createElement('span');
    const button = document.createElement('button');
    button.addEventListener('click', handleTodoDelete);
    li.id = newTodo.id;
    span.innerText = newTodo.text;
    button.innerText = '삭제';
    li.appendChild(span);
    li.appendChild(button);
    todoList.appendChild(li);
}

function addTodo (newTodo) {
    todoData.push(newTodo);
    saveTodo();
}

function saveTodo () {
    localStorage.setItem(TODO_KEY, JSON.stringify(todoData));
}