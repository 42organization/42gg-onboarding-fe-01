export default class Model {
	data;
	length;
	constructor() {
		this.data = [],
		this.length = 0;
	}
	addItem(name) { 
		this.data.push( 
		{
			name : name,
			status: false,
			key : this.length++,
		}) 	// updatedata
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
		console.log(item)
		item.status = status;
		console.log(item)
	}
}