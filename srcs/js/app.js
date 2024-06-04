const TODOS_KEY = "todo";
let todoList = [];

// localStorage에 todoList 저장하는 함수
function saveTodoList() {
  localStorage.setItem(TODOS_KEY, JSON.stringify(todoList));
}

const todoListItemsContainer = document.querySelector(
  ".todoListItemsContainer"
);

// todoList UI 생성 함수
function createTodoList(todoItem) {
  const todoItemWrapper = document.createElement("div");
  todoItemWrapper.classList.add("todoListItemsWrapper");

  const todoItemText = document.createElement("p");
  todoItemText.innerText = todoItem.text;

  const modifyButton = document.createElement("button");
  modifyButton.innerText = "MODIFY";

  const deleteButton = document.createElement("button");
  deleteButton.innerText = "DELETE";

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
