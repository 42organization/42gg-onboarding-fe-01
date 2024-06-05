export default class View {
	constructor(model) {
		this.model = model;

		this.app = document.getElementById('root');

		this.todoForm = document.getElementById('todo-form');
		this.todoInput = document.getElementById('todo-input');
		this.todoList = document.querySelector('.todo-list');

		this.addEventListeners();
	}

	addTodo(todoText) {
		this.model.add(todoText);
		this.updateView();
	}

	deleteTodo(id) {
		this.model.delete(id);
		this.updateView();
	}

	editTodo(id, newText) {
		this.model.edit(id, newText);
		this.updateView();
	}

	toggleTodo(id) {
		this.model.toggle(id);
		this.updateView();
	}

	updateView() {
		this.todoList.innerHTML = '';

		this.model.todoList.forEach(todo => {
			const todoHTML = createTodoItem({
				id: todo.id,
				text: todo.text,
				completed: todo.completed ? 'completed' : '',
				checked: todo.completed ? 'checked' : '',
				index: todo.id
			});
			this.todoList.innerHTML += todoHTML;
		});

		this.addTodoEventListeners();
	}


	addEventListeners()
	{
		this.todoForm.addEventListener('submit', (e) => {
			e.preventDefault();
			const todoText = this.todoInput.value.trim();

			if (todoText !== '') {
				this.addTodo(todoText);
				this.todoInput.value = '';
			}
		});
	}

	addTodoEventListeners() {
		this.todoList.querySelectorAll('.destroy').forEach(button => {
			button.addEventListener('click', (e) => {
				const id = parseInt(e.target.closest('li').dataset.id);

				this.deleteTodo(id);
			});
		});

		this.todoList.querySelectorAll('label').forEach(label => {

			label.addEventListener('dblclick', (e) => {
				const id = parseInt(e.target.closest('li').dataset.id);
				label.contentEditable = true;

				// label.classList.add('editable');
				// 엔터 아니면 다른 부분 누르면 적용

			});

			label.addEventListener('change', (e) => {
				console.log('change');
				label.contentEditable = false;
			});

		});

		this.todoList.querySelectorAll('.toggle').forEach(check =>{
			check.addEventListener('change', (e)=>
			{
				const id = parseInt(e.target.closest('li').dataset.id);
				this.toggleTodo(id);

			});
		});

	}
}

function createElement(tag, className) {
	const element = document.createElement(tag);
	if (className) element.classList.add(className);
	return element;
}

function createTodoItem({ id, text, completed, checked, index }) {
	return `
	<li data-id="${id}" class="item ${completed}">
	    <div class="item-line">
	        <input class="toggle" type="checkbox" ${checked}>
	        <label>${text}</label>
	        <button class="destroy">X</button>
	    </div>
	</li>
	`;
}
