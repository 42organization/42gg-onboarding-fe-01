const todoForm = document.getElementById('todo-form');
const todoInput = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');

// Initialize

const TODO_KEY = 'todoData'
let todoData = JSON.parse(localStorage.getItem(TODO_KEY)) || [];
todoData.map(printTodo);

todoForm.addEventListener('submit', handleTodoSubmit);

// Event Handlers

function handleTodoSubmit(event) {
    event.preventDefault(); // 새로고침 방지
    const newTodo = {
        id: Date.now(),     // 현재 시간의 밀리초를 id로 사용
        text: todoInput.value,
    }
    todoInput.value = '';
    printTodo(newTodo);
    addTodo(newTodo);
}

function handleTodoDelete(event) {
    const targetId = parseInt(event.target.parentElement.id);
    const li = event.target.parentElement; // 삭제할 li
    li.remove();
    todoData = todoData.filter((todo) => { return (todo.id !== targetId); });
    saveTodo();
}

function handleTodoUpdate(event) {
    const li = event.target.parentElement;  // 수정할 Todo
    const div = li.querySelector('div');
    const updateButton = li.querySelector('.update');
    updateButton.innerText = '취소';
    updateButton.removeEventListener('click', handleTodoUpdate);
    updateButton.addEventListener('click', handleTodoUpdateCancel);
    const form = document.createElement('form');
    form.addEventListener('submit', handleChangedTodoSubmit);
    const updateInput = document.createElement('input');
    updateInput.type = 'text';
    updateInput.value = div.innerText;
    div.innerText = '';
    div.appendChild(form);
    form.appendChild(updateInput);
}

function handleChangedTodoSubmit(event) {
    event.preventDefault();
    const form = event.target;
    const todoId = parseInt(form.parentElement.parentElement.id);   // 수정할 Todo의 id
    const div = form.parentElement;                                 // Form 부모 div
    const updateInput = form.querySelector('input').value;          // 수정할 내용
    const updateButton = div.parentElement.querySelector('.update');
    updateButton.innerText = '수정';
    updateButton.removeEventListener('click', handleTodoUpdateCancel);
    updateButton.addEventListener('click', handleTodoUpdate);
    div.innerText = updateInput;
    form.remove();
    todoData = todoData.map((todo) => {
        if (todo.id === todoId) {
            todo.text = updateInput;
        }
        return todo;
    }); // 수정한 내용 반영
    saveTodo();
}

function handleTodoUpdateCancel(event) {
    const li = event.target.parentElement;  // 수정할 Todo
    const id = parseInt(li.id);
    const div = li.querySelector('div');
    const form = div.querySelector('form');
    form.remove();
    const updateButton = li.querySelector('.update');
    updateButton.innerText = '수정';
    updateButton.removeEventListener('click', handleTodoUpdateCancel);
    updateButton.addEventListener('click', handleTodoUpdate);
    const oldTodo = todoData.find((todo) => todo.id === id);
    div.innerText = oldTodo.text;
}

// Functions

function printTodo (newTodo) {
    const li = document.createElement('li');
    li.id = newTodo.id;
    const div = document.createElement('div');
    const updateButton = document.createElement('button');
    updateButton.addEventListener('click', handleTodoUpdate);
    updateButton.className = 'update';
    updateButton.innerText = '수정';
    const deleteButton = document.createElement('button');
    deleteButton.addEventListener('click', handleTodoDelete);
    deleteButton.className = 'delete';
    deleteButton.innerText = '삭제';
    div.innerText = newTodo.text;

    li.appendChild(div);
    li.appendChild(updateButton);
    li.appendChild(deleteButton);
    todoList.appendChild(li);
}

function addTodo (newTodo) {
    todoData.push(newTodo);
    saveTodo();
}

function saveTodo () {
    localStorage.setItem(TODO_KEY, JSON.stringify(todoData));
}