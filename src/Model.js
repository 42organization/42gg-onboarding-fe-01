export default class Model {
	constructor() {
		this.loadLocalStorage();
	}

	loadLocalStorage() {
		const storage = localStorage.getItem('todoList');

		if (storage) {
				this.todoList = JSON.parse(storage);
		} else {
				this.todoList = [];
		}
		const storageNextId = localStorage.getItem('nextId');
		this.nextId = storageNextId ? parseInt(storageNextId) : 0;
	}

	updateLocalStorage() {
		localStorage.setItem('todoList', JSON.stringify(this.todoList));
		localStorage.setItem('nextId', this.nextId.toString());
	}

	add(todoText) {
			const item = {
				id: this.nextId++,
				text: todoText,
				completed: false,
			};
			this.todoList.push(item);
			this.updateLocalStorage();
	}

	edit(id, newText) {
		const item = this.todoList.find(item => item.id === id);
		if (item) {
				item.text = newText;
				this.updateLocalStorage();
		}
	}

	delete(id) {
		const index = this.todoList.findIndex(item => item.id === id);

		if (index !== -1) {
			this.todoList.splice(index, 1);
			this.updateLocalStorage();
		}
	}

	toggle(id) {
		const item = this.todoList.find(item => item.id === id);
		if (item) {
				item.completed = !item.completed;
				this.updateLocalStorage();
		}
	}
}
