export default class Model {
	data;
	length;
	constructor() {
		var strData = JSON.parse(localStorage.getItem("data"))
		this.data = strData && strData.length ? strData : [];
	}
	_updateStorage(){
		localStorage.setItem("data", JSON.stringify(this.data));
	}
	addItem(name) { 
		const newData = 
		{
			name : name,
			status: false,
			key : this.data.length,
		} 	// updatedata
		this.data.push(newData);
		this._updateStorage();
		return this.data[this.data.length - 1];
	}
	deleteItem(key) {
		if (this.data.find(item => item.key.toString() === key)){
			delete this.data[key];
		}
		else
			console.error("cannot delete Item");
		this._updateStorage();
	}
	getItemByStatus(status){ // assume type comes in correctly
		if (status === "all")	return this.data;
		status = status === "active" ? false : true;
		return (this.data.filter((item) => item.status === status))
	}
	updateItemStatus (key, status) {
		let item = this.data.find((i) => i.key.toString() === key);
		item.status = status;
		this._updateStorage();
	}
}