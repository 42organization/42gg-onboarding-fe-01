const TODOS_KEY = "todo";
let todoList = [];
loadLocalStorage();

// submit EventListener
const todoForm = document.querySelector("form");
todoForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const inputBox = document.querySelector(".todoListInputBox");
  const newTodo = inputBox.value;
  inputBox.value = "";
  if (newTodo != "") {
    const newTodoItem = {
      text: newTodo,
      id: Date.now(),
    };
    todoList.push(newTodoItem);
    createTodo(newTodoItem);
    saveLocalStorage();
  }
});

// localStorage에서 데이터 가져오기 -> todoList에 데이터 추가 + UI 생성
function loadLocalStorage() {
  const getTodoList = localStorage.getItem(TODOS_KEY);
  if (getTodoList !== null) {
    const parsedTodoList = JSON.parse(getTodoList);
    todoList = parsedTodoList;
    parsedTodoList.forEach((todoItem) => {
      createTodo(todoItem);
    });
  }
}

// todoList 데이터를 localStorage에 저장(갱신)
function saveLocalStorage() {
  localStorage.setItem(TODOS_KEY, JSON.stringify(todoList));
}

// todoItemWrapper안에 UI 넣는 함수
function createTodoItemElement(todoItemWrapper, textContent) {
  const todoItemText = document.createElement("p");
  todoItemText.innerText = textContent;

  const modifyButton = document.createElement("button");
  modifyButton.innerText = "MODIFY";
  modifyButton.addEventListener("click", (e) => {
    const targetWrapper = e.target.parentElement;
    modifyTodo(targetWrapper);
  });

  const deleteButton = document.createElement("button");
  deleteButton.innerText = "DELETE";
  deleteButton.addEventListener("click", (e) => {
    const targetWrapper = e.target.parentElement;
    deleteTodo(targetWrapper);
  });

  todoItemWrapper.appendChild(todoItemText);
  todoItemWrapper.appendChild(modifyButton);
  todoItemWrapper.appendChild(deleteButton);
}

// todo UI 생성하는 함수
function createTodo(todoItem) {
  const todoListItemsContainer = document.querySelector(
    ".todoListItemsContainer"
  );

  const todoItemWrapper = document.createElement("div");
  todoItemWrapper.classList.add("todoListItemsWrapper");
  todoItemWrapper.id = todoItem.id;

  createTodoItemElement(todoItemWrapper, todoItem.text);
  todoListItemsContainer.appendChild(todoItemWrapper);
}

// 수정(modify) 버튼 클릭 시, 작동되는 함수
function modifyTodo(todoItemWrapper) {
  const todoItemText = todoItemWrapper.querySelector("p");
  const todoTextContent = todoItemText.textContent;

  const buttons = todoItemWrapper.querySelectorAll("button");
  const modifyButton = buttons[0];
  const deleteButton = buttons[1];

  // modify UI 만들기
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

  saveButton.addEventListener("click", (e) => {
    e.preventDefault();
    saveTodo(todoItemWrapper);
  });
  modifyForm.addEventListener("submit", (e) => {
    e.preventDefault();
    saveTodo(todoItemWrapper);
  });
  cancelButton.addEventListener("click", (e) => {
    todoItemWrapper.replaceChild(todoItemText, modifyForm);
    todoItemWrapper.replaceChild(modifyButton, saveButton);
    todoItemWrapper.replaceChild(deleteButton, cancelButton);
  });

  modifyInput.focus();
}

// 삭제(delete) 버튼 클릭 시, 작동되는 함수
function deleteTodo(todoItemWrapper) {
  todoItemWrapper.remove();
  todoList = todoList.filter(
    (item) => item.id !== parseInt(todoItemWrapper.id)
  );
  saveLocalStorage();
}

// 저장(save) 버튼 클릭 시, 작동되는 함수
function saveTodo(todoItemWrapper) {
  const modifyInput = todoItemWrapper.querySelector("input");
  const modifyTextContent = modifyInput.value;
  const todoItem = todoList.find(
    (item) => item.id === parseInt(todoItemWrapper.id)
  );
  todoItem.text = modifyTextContent;
  saveLocalStorage();
  todoItemWrapper.innerHTML = "";
  createTodoItemElement(todoItemWrapper, todoItem.text);
}
