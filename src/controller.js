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
		if (!this.model.getItemByStatus("all").length)
			this.addItem("default");
		this.view.updateItem("toggle", this.model.getItemByStatus(this.status));
	}
	addItem (value) {
		const newItem = this.model.addItem(value);
		if (this.status !== "compelete")
			this.view.updateItem("add", newItem);
	}
	deleteItem(event) {
		if (event.target.className !== "todo-item-delete")	return ;
		const Item = event.target.closest("li");
		this.view.updateItem("delete", Item);
		this.model.deleteItem(Item.getAttribute("key"));
	}
	toggleByStatus(e) {
		this.status = e.target.getAttribute("key");
		let data = this.model.getItemByStatus(this.status);
		this.view.updateItem("toggle", data, this.status);
	}
	changeStatus(e) {
		if (e.target.className !== "todo-item-complete") return;
		let item = e.target.closest("li");
		let status = e.target.checked;
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

