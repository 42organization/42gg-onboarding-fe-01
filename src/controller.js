export default class Controller{
	view;
	model;
	constructor( View, Model ) {
		this.view = View,
		this.model = Model,
		this.status = "active"
		this.view.bindEvent("submitInput", (value) => this.addItem(value));
		this.view.bindEvent("deleteBtn", (event) => this.deleteItem(event));
		this.view.bindEvent("toggleByStatus", (event) => this.toggleByStatus(event));
		this.view.bindEvent("stateCheckBtn", (event) => this.changeStatus(event));
	}
	addItem (value) {
		console.log(this)
		const newItem = this.model.addItem(value);
		if (this.status !== "compelete")
			this.view.updateItem("add", newItem);
	}
	deleteItem(event) {
		if (event.target.className !== "todo-item-delete")	return ;
		const Item = event.target.closest("li");
		console.log(Item);
		console.log(Item.getAttribute("key"))
		this.view.updateItem("delete", Item);
		this.model.deleteItem(Item.getAttribute("key"));
	}
	toggleByStatus(e) {
		console.log(e.target)
		this.status = e.target.getAttribute("key");
		let data = this.model.getItemByStatus(this.status);
		console.log(data);
		this.view.updateItem("toggle", data, this.status);
	}
	changeStatus(e) {
		console.log(e.target);
		if (e.target.className !== "todo-item-complete") return;
		let item = e.target.closest("li");
		let status = e.target.checked;
		console.log(status);
		this.model.updateItemStatus(item.getAttribute("key"), status);
		if (this.isMatchStatus(status)){
			this.view.changeItemStatus(item, status);
		}
		else (this.view.updateItem("delete", item))
	}
	isMatchStatus(status){
		if (this.status === "all" || (this.status === "active" && !status ) || (this.status === "active" && status)) return true;
		return false;
	}
}

