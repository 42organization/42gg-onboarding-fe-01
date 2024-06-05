export default class Model {
	constructor() {
	  this.todoList = [];
		this.nextId = 0;
	}

	add(todoText) {
		const item = {
		  id: this.nextId++,
		  text: todoText,
		  completed: false,
		};
		this.todoList.push(item);
	}

	edit(id, newText) {
		const item = this.todoList.find(item => item.id === id);
		if (item) {
				item.text = newText;
		}
	}

	delete(id) {
		const index = this.todoList.findIndex(item => item.id === id);

		if (index !== -1) {
			this.todoList.splice(index, 1);
		}
	}

	toggle(id) {
		const item = this.todoList.find(item => item.id === id);
		if (item) {
				item.completed = !item.completed;
		}
	}
}
