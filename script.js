const body = document.querySelector('body');
const modal = document.querySelector('.modal');
const btnOpenPopup = document.querySelector('.btn-open-popup');
const btnAddTodo = document.querySelector('.btn-add-todo');
const todoInput = document.querySelector('#todo-input');
const todoList = document.querySelector('#todo-list');
const doneList = document.querySelector('#done-list');

const TODO_KEY = 'todoDataList'
let todoDataList = JSON.parse(localStorage.getItem(TODO_KEY)) || [];
todoDataList.map(printTodo);

//addTodo popup
btnOpenPopup.addEventListener('click', () => {
  modal.classList.toggle('show');

  if (modal.classList.contains('show')) {
    body.style.overflow = 'hidden';
  }
});

modal.addEventListener('click', (event) => {
  if (event.target === modal) {
    modal.classList.toggle('show');
  }
});

btnAddTodo.addEventListener('click', handleTodoSubmit);

function handleTodoSubmit(event) {
  event.preventDefault();
  if (todoInput.value.trim() === '') {
    alert('내용을 입력해 주세요');
    return ;
  }
  const newTodo = {
    id: 'todoItem-' + Date.now(),
    content: todoInput.value,
    isDone: false,
  }
  printTodo(newTodo);
  modal.classList.remove('show');
  todoInput.value = null;
  todoDataList.push(newTodo);
  saveTodoDataList(newTodo);
}

function handleTodoDelete(event) {
  const li = event.target.closest('li');
  if (li) {
    eraseTodo(li.id);
  }
  todoDataList = todoDataList.filter(todoData => todoData.id !== li.id);
  saveTodoDataList();
}


function handleTodoDone(event) {
  const li = event.target.closest('li');
  console.log(li);
  let todoData = todoDataList.find(todoData => todoData.id == li.id);
  todoData.isDone = true;
  eraseTodo(todoData.id);
  printTodo(todoData);
  saveTodoDataList();
}

function handleTodoUndone(event) {
  const li = event.target.closest('li');
  let todoData = todoDataList.find(todoData => todoData.id == li.id);
  todoData.isDone = false;
  eraseTodo(li.id);
  printTodo(todoData);
  saveTodoDataList();
}

function eraseTodo(todoId) {
  const todoItem = document.querySelector('#' + todoId);
  if (todoItem) {
    todoItem.remove();
  }
}

function printTodo(todoData) {
  const li = document.createElement('li');
  li.id = todoData.id;

  const btnDelete = document.createElement('button');
  btnDelete.classList.add('btn-delete');
  btnDelete.addEventListener('click', handleTodoDelete);
  btnDelete.innerText = '삭제';

  const taskDiv = document.createElement('div');
  taskDiv.innerText = todoData.content;

  if (todoData.isDone == false) {
    const btnDone = document.createElement('button');
    btnDone.classList.add('btn-todo-done');
    btnDone.addEventListener('click', handleTodoDone);

    li.appendChild(btnDone);
    li.appendChild(taskDiv);
    li.appendChild(btnDelete);
    todoList.appendChild(li);
  } else {
    const btnDone = document.createElement('button');
    btnDone.classList.add('btn-todo-undone');
    btnDone.addEventListener('click', handleTodoUndone);

    li.appendChild(btnDone);
    li.appendChild(taskDiv);
    li.appendChild(btnDelete);
    doneList.appendChild(li);
  }
}

function saveTodoDataList() {
  localStorage.setItem(TODO_KEY, JSON.stringify(todoDataList));
}