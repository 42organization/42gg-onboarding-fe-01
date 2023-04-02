const todoInput = document.querySelector('.todo-input');
const todoList = document.querySelector('.todo-list');

const TODOS_KEY = "todos";

let todos = [];
let id = 0;

function setTodos(newTodos) {
	todos = newTodos;
}

function getAllTodos() {
	return todos;
}

function appendTodos(text) {
	const newId = Date.now();
	const newTodos = getAllTodos().concat({id: newId, isCompleted: false, content: text});
	setTodos(newTodos);
	paintTodos();
	saveToDos();
}

function completeTodo(todoId) {
	const newTodos = getAllTodos().map(todo => todo.id === todoId ? {...todo, isCompleted: !todo.isCompleted} : todo);
	setTodos(newTodos);
	paintTodos();
	saveToDos();
}

function deleteToDo(todoId) {
	const newTodos = getAllTodos().filter(todo => todo.id !== todoId);
	setTodos(newTodos);
	paintTodos();
	saveToDos();
}

function updateTodo(text, todoId) {
	const newTodos = getAllTodos().map(todo => todo.id === todoId ? ({...todo, content: text}) : todo);
	setTodos(newTodos);
	paintTodos();
	saveToDos();
}

function onDbclickTodo(event, todoId) {
	const todoElem = event.target;
	const inputText = event.target.innerText;
	const todoItem = todoElem.parentNode;
	const inputElem = document.createElement('input');
	inputElem.value = inputText;
	inputElem.classList.add('edit-input');
	inputElem.setAttribute('maxlength', '15');

	console.log(event.target.innerText);

	inputElem.addEventListener('keypress', (event)=>{
		if(event.key === 'Enter' && event.target.value !== '') {
			updateTodo(event.target.value, todoId);
			document.body.removeEventListener('click', onClickBody);
		}
	})

	function onClickBody(event) {
		if (event.target !== inputElem) {
			todoItem.removeChild(inputElem);
			document.body.removeEventListener('click', onClickBody);
		}
	}
	document.body.addEventListener('click', onClickBody);
	todoItem.appendChild(inputElem);
}

function saveToDos() {
	localStorage.setItem(TODOS_KEY, JSON.stringify(todos));
}

function paintTodos() {
	todoList.innerHTML = '';
	const allTodos = getAllTodos();

	allTodos.forEach(todo => {
		const todoItem = document.createElement('li');
		todoItem.classList.add('todo-item');
		
		todoItem.setAttribute('data-id', todo.id);

		const checkboxElem = document.createElement('div');
		checkboxElem.classList.add('checkbox');
		checkboxElem.addEventListener('click', () => completeTodo(todo.id));

		const todoElem = document.createElement('div');
		todoElem.classList.add('todo');
		todoElem.addEventListener('dblclick', (event) => onDbclickTodo(event, todo.id));
		todoElem.innerText = todo.content;

		const delBtn = document.createElement('button');
		delBtn.classList.add('delBtn');
		delBtn.addEventListener('click', () => deleteToDo(todo.id));
		delBtn.innerHTML = 'X';

		if (todo.isCompleted) {
			todoItem.classList.add('checked');
			checkboxElem.innerText = '✔';
		}
		todoItem.appendChild(checkboxElem);
		todoItem.appendChild(todoElem);
		todoItem.appendChild(delBtn);

		todoList.appendChild(todoItem);
	})
}

function init() {
	todoInput.addEventListener('keypress', (event) =>{
		if (event.key === 'Enter' && event.target.value !== ''){
			appendTodos(event.target.value); 
			todoInput.value = '';
		}
	})
}

const savedToDos = localStorage.getItem(TODOS_KEY);

if(savedToDos !== null) {
	const parsedToDos = JSON.parse(savedToDos);
	todos = parsedToDos;
	parsedToDos.forEach(paintTodos);
}

init();
