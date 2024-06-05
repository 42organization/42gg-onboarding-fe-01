const TODOS_KEY = "todo";
let todoList = [];

// localStorage에 todoList 저장하는 함수
function saveTodoList() {
  localStorage.setItem(TODOS_KEY, JSON.stringify(todoList));
}

function saveTodo(todoItemWrapper) {
  return (e) => {
    e.preventDefault();
    const modifyInput = todoItemWrapper.querySelector("input");
    const modifyTextContent = modifyInput.value;
    const todoItem = todoList.find(
      (item) => item.id === parseInt(todoItemWrapper.id)
    );
    todoItem.text = modifyTextContent;
    saveTodoList();
    todoItemWrapper.innerHTML = "";

    const todoItemText = document.createElement("p");
    todoItemText.innerText = todoItem.text;

    const modifyButton = document.createElement("button");
    modifyButton.innerText = "MODIFY";
    modifyButton.addEventListener("click", modifyTodo);

    const deleteButton = document.createElement("button");
    deleteButton.innerText = "DELETE";
    deleteButton.addEventListener("click", deleteTodo);

    todoItemWrapper.appendChild(todoItemText);
    todoItemWrapper.appendChild(modifyButton);
    todoItemWrapper.appendChild(deleteButton);
  };
}

function modifyTodo(e) {
  const todoItemWrapper = e.target.parentElement;

  const todoItemText = todoItemWrapper.querySelector("p");
  const todoTextContent = todoItemText.textContent;
  const todoId = todoItemWrapper.id;

  const buttons = todoItemWrapper.querySelectorAll("button");
  const modifyButton = buttons[0];
  const deleteButton = buttons[1];

  // input form, save, cancel
  const modifyForm = document.createElement("form");
  const modifyInput = document.createElement("input");
  modifyInput.classList.add("modifyInput");
  modifyInput.value = todoTextContent;
  modifyForm.appendChild(modifyInput);

  const saveButton = document.createElement("button");
  saveButton.innerText = "SAVE";

  const cancelButton = document.createElement("button");
  cancelButton.innerText = "CANCEL";

  todoItemWrapper.replaceChild(modifyForm, todoItemText);
  todoItemWrapper.replaceChild(saveButton, modifyButton);
  todoItemWrapper.replaceChild(cancelButton, deleteButton);

  saveButton.addEventListener("click", saveTodo(todoItemWrapper));
  modifyForm.addEventListener("submit", saveTodo(todoItemWrapper));
  cancelButton.addEventListener("click", (e) => {
    todoItemWrapper.replaceChild(todoItemText, modifyForm);
    todoItemWrapper.replaceChild(modifyButton, saveButton);
    todoItemWrapper.replaceChild(deleteButton, cancelButton);
  });
  modifyInput.focus();
}

function deleteTodo(e) {
  const todoItemWrapper = e.target.parentElement;
  todoItemWrapper.remove();
  todoList = todoList.filter(
    (item) => item.id !== parseInt(todoItemWrapper.id)
  );
  saveTodoList();
}

const todoListItemsContainer = document.querySelector(
  ".todoListItemsContainer"
);

// todoList UI 생성 함수
function createTodoList(todoItem) {
  const todoItemWrapper = document.createElement("div");
  todoItemWrapper.classList.add("todoListItemsWrapper");
  todoItemWrapper.id = todoItem.id;

  const todoItemText = document.createElement("p");
  todoItemText.innerText = todoItem.text;

  const modifyButton = document.createElement("button");
  modifyButton.innerText = "MODIFY";
  modifyButton.addEventListener("click", modifyTodo);

  const deleteButton = document.createElement("button");
  deleteButton.innerText = "DELETE";
  deleteButton.addEventListener("click", deleteTodo);

  todoItemWrapper.appendChild(todoItemText);
  todoItemWrapper.appendChild(modifyButton);
  todoItemWrapper.appendChild(deleteButton);
  todoListItemsContainer.appendChild(todoItemWrapper);
}

// localStorage에 todoList 데이터 가져오기
const getTodoList = localStorage.getItem(TODOS_KEY);
if (getTodoList !== null) {
  const parsedTodoList = JSON.parse(getTodoList);
  todoList = parsedTodoList;
  parsedTodoList.forEach((todoItem) => {
    createTodoList(todoItem);
  });
}

// submit EventListener
const inputBox = document.querySelector(".todoListInputBox");
const todoForm = document.querySelector("form");
todoForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const newTodo = inputBox.value;
  inputBox.value = "";
  if (newTodo != "") {
    const newTodoItem = {
      text: newTodo,
      id: Date.now(),
    };
    todoList.push(newTodoItem);
    createTodoList(newTodoItem);
    saveTodoList();
  }
});
