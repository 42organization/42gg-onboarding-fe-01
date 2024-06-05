export default class Controller{
	view;
	model;
	constructor( View, Model ) {
		this.view = View,
		this.model = Model,
		this.view.bindEvent(".todo-item-delete", "click", (e) => {
			this.deleteItem (e.target.closest("li"))
			console.log(e.currentTarget);
		})
		this.view.bindEvent("#todo-input-container", "submit", (e) => {
			e.preventDefault();
			this.addItem();
			console.log("SDF") 
		})
	}
	addItem (value) {
		value = value || this.view.getItem("input");
		const newItem = this.model.addItem(value);
		this.view.clearInput();
		this.view.updateItem(true, newItem);
		this.view.bindEvent(".todo-item-delete", "click", (e) => {
			this.deleteItem (e.target.closest("li"))
			console.log(e.currentTarget);
		})
	}
	deleteItem(Item) {
		if(!Item) return;
		console.log(Item);
		console.log(Item.getAttribute("key"))
		this.view.updateItem(false, Item);
		this.model.deleteItem(Item.getAttribute("key"));
	}
}

