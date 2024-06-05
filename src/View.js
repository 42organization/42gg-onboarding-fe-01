import { qs, qsa, dc } from "./utils.js"

export default class View {
	constructor() {
		this.status = "all";
		this.input = qs("#todo-input");
		this.list = qs("#todo-list-ul");
	}
	getItem(selector){
		if (selector === "input"){
			return this.input.value;
		}
	}
	clearInput(){
		this.input.value = "";
	}
	updateItem(status, data){
		console.log(data, this.list)
		if (status){ //add{
			const li = dc("li");
			li.setAttribute("class", "todo-item");
			li.setAttribute("key", data.key);
			li.innerHTML = `
			<p>${data.name}</p>
			<button class="todo-item-delete" key="${data.key}">X</button>
			`
			this.list.appendChild(li);
		}
		else {
			this.list.removeChild(data);
		}
	}
	bindEvent(selector, eventType, callback){
		const targetlist = qsa(selector);
		targetlist.length > 0 && targetlist.forEach(target => target.addEventListener(eventType, callback));
		
	}
		
}
