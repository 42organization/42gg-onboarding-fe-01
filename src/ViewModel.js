export default class ViewModel {
	constructor(model) {
		this.model = model;
		this.todoList = this.model.todoList;

		this.todoListChanged = null;
	}

	addTodo = (todoText) => {
		this.model.add(todoText);
		this.todoListChanged(this.todoList);
	}

	deleteTodo = (id) => {
		this.model.delete(id);
		this.todoListChanged(this.todoList);
	}

	editTodo = (id, newText) => {
		this.model.edit(id, newText);
		this.todoListChanged(this.todoList);
	}

	toggleTodo = (id) => {
		this.model.toggle(id);
		this.todoListChanged(this.todoList);
	}
}
