export default class Model {
	data;
	length;
	constructor() {
		this.data = {},
		this.length = 0;
	}
	addItem(name) {
		this.data[this.length] = 
		{
			name : name,
			status: "active",
			key : this.length,
		} 	// updatedata
		return this.data[this.length++];
	}
	deleteItem(key) {
		console.log(this.data);
		if (this.data[key]){
			delete this.data[key];
		}
		else
			console.error("cannot delete Item");
	}


}