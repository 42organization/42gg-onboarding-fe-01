export default class Model {
	data;
	length;
	constructor() {
		this.data = [],
		this.length = 0;
	}
	_updateStorage(newItem, oldkey){
		console.log(newItem.key)
		if (oldkey) window.localStorage.removeItem(oldkey);
		if (newItem) window.localStorage.setItem(newItem.key, JSON.stringify(newItem));
		console.log(window.localStorage);
	}
	addItem(name) { 
		const newData = 
		{
			name : name,
			status: false,
			key : this.length++,
		} 	// updatedata
		this.data.push(newData);
		this._updateStorage(newData);
		return this.data[this.data.length - 1];
	}
	deleteItem(key) {
		console.log(this.data, key);
		console.log(this.data.find(item => item.key.toString() === key));
		if (this.data.find(item => item.key.toString() === key)){
			delete this.data[key];
		}
		else
			console.error("cannot delete Item");
		this._updateStorage(null, this.data[key]);
	}
	getItemByStatus(status){ // assume type comes in correctly
		if (status === "all")	return this.data;
		console.log(status);
		status = status === "active" ? false : true;
		console.log(status);
		return (this.data.filter((item) => item.status === status))
	}
	updateItemStatus (key, status) {
		let item = this.data.find( i => i.key.toString() === key);
		item.status = status;
		this._updateStorage(item, item.key);
	}
}