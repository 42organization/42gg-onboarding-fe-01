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
			status: "active",
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
		return (this.data.filter((item) => item.status === status))
	}

}