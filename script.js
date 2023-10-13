const body = document.querySelector('body');
const modal = document.querySelector('.modal');
const btnOpenPopup = document.querySelector('.btn-open-popup');
const btnAddTodo = document.querySelector('.btn-add-todo');
const todoInput = document.querySelector('#todo-input');
const todoList = document.querySelector('#todo-list');
const doneList = document.querySelector('#done-list');

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

    if (!modal.classList.contains('show')) {
      body.style.overflow = 'auto';
    }
  }
});

btnAddTodo.addEventListener('click', handleToDoSubmit);


function handleToDoSubmit(event) {
  event.preventDefault();
  const newTodo = {
    id : Date.now(),
    content : todoInput.value,
    is_done : false,
  }
  console.log('asdfasdfsda');
  printTodoList(newTodo);
  saveTodoData();
}


function printTodoList(todoData) {
  let li = document.createElement('li');
  li.innerText = todoData.content;
  todoList.appendChild(li);
}