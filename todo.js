const todoMap = new Map();

function render() {
  if (todoMap.size) {
    const obj = {};
    todoMap.forEach((value, key) => {
      obj[key] = value;
    });
    localStorage.setItem('todo', JSON.stringify(obj));
  }

  const json = JSON.parse(localStorage.getItem('todo'));

  if (json !== null) {
    for (let [key, value] of Object.entries(json)) {
      todoMap.set(+key, value);
    }
  }

  const fragmentTodo = new DocumentFragment();

  let todoDiv = document.createElement('div');
  todoDiv.setAttribute("id", 'todo-list');
  fragmentTodo.appendChild(todoDiv);

  let doneDiv = document.createElement('div');
  doneDiv.setAttribute("id", 'done-list');
  fragmentTodo.appendChild(doneDiv);

  for (let content of todoMap) {
    let ol = document.createElement('ol');
    ol.setAttribute('id', content[0]);
    let checkbox = document.createElement('input');
    checkbox.setAttribute('type', 'checkbox');
    checkbox.setAttribute('id', content[0] + '-checkbox');
    checkbox.setAttribute('onClick', 'clickCheckbox(id)');
    checkbox.checked = content[1].checked;

    let label = document.createElement('label');
    label.setAttribute('for', content[0] + '-checkbox');
    label.setAttribute('id', content[0] + '-label');
    label.append(content[1].todo);

    let deleteButton = document.createElement('input');
    deleteButton.setAttribute("type", 'button');
    deleteButton.setAttribute("value", 'delete');
    deleteButton.setAttribute("id", content[0] + '-deleteButton');
    deleteButton.setAttribute("onclick", 'deleteTodo(id)');

    let modifyButton = document.createElement('input');
    modifyButton.setAttribute("type", 'button');
    modifyButton.setAttribute("value", 'modify');
    modifyButton.setAttribute("id", content[0] + '-modifyButton');
    modifyButton.setAttribute("onclick", 'modifyTodoElement(id)');

    if (content[1].checked)
      doneDiv.appendChild(ol);
    else
      todoDiv.appendChild(ol);
    ol.appendChild(checkbox);
    ol.appendChild(label);
    ol.appendChild(modifyButton);
    ol.appendChild(deleteButton);

  }

  let todos = document.getElementById('todos');
  if (!todos) {
    todos = document.createElement('div');
    todos.setAttribute("id", 'todos');
    todos.appendChild(fragmentTodo);
    const todoMain = document.getElementById('todo-main');
    todoMain.appendChild(todos);
  } else {
    todos.replaceChildren(fragmentTodo);
  }

}

function createTodo() {
  const todo = document.getElementById('input').value;
  if (!todo) return;
  const time = new Date().getTime();
  const checked = false;
  todoMap.set(time, { checked, todo });
  render();
}

function deleteTodo(id) {
  const key = id.slice(0, id.indexOf('-'));
  if (key === "") return;
  todoMap.delete(+key);
  if (todoMap.size === 0)
    localStorage.clear();
  render();
}

function clickCheckbox(id) {
  const key = +id.slice(0, id.indexOf('-'));
  if (key === "") return;
  let todoObj = todoMap.get(key);
  todoObj.checked = !(todoObj.checked);
  todoMap.set(key, todoObj);
  render();
}

function modifyTodoElement(id) {
  const key = +id.slice(0, id.indexOf('-'));
  const ol = document.getElementById(key);

  const inputText = document.createElement('input');
  inputText.setAttribute('id', 'todo-element');
  inputText.setAttribute('type', 'text');
  inputText.setAttribute('formaction', 'get');

  const inputSubmit = document.createElement('input');
  inputSubmit.setAttribute('type', 'submit');
  inputSubmit.setAttribute('id', key + '-input');
  inputSubmit.setAttribute('value', 'modify');
  inputSubmit.setAttribute('onclick', 'modifyTodo(id)');

  ol.replaceChildren(inputText);
  ol.appendChild(inputSubmit);
}

function modifyTodo(id) {
  if (id === '') return render();
  const input = document.getElementById('todo-element').value;
  if (input === '') return render();
  const key = +id.slice(0, id.indexOf('-'));
  let value = todoMap.get(key);
  value.todo = input;
  todoMap.set(key, value);
  render();
}

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('download').addEventListener('click', () => {
    let obj = {};
    todoMap.forEach((value, key) => {
      obj[key] = value;
    });
    const date = new Date();
    downloadFile(JSON.stringify(obj),
      date.getFullYear().toString() + (date.getMonth() + 1) + date.getDay().toString() + '.todo',
      'text/plain'
    );
  });

  function downloadFile(content, fileName, fileType) {
    const blob = new Blob([content], { type: fileType });

    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }
});

const fileInput = document.querySelector("input[id=fileButton]");

fileInput.addEventListener("change", async () => {
  const [file] = fileInput.files;

  if (file) {
    let load = await file.text();
    let json = JSON.parse(load);
    for (let [key, value] of Object.entries(json)) {
      todoMap.set(+key, value);
    }
  }
  render();
});
