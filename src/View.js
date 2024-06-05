import { qs, qsa, dc } from "./utils.js"

export default class View {
	constructor() {
		this.status = "all";
		this.input_container = qs("#todo-input-container");
		this.input = qs("#todo-input");
		this.list = qs("#todo-list-ul");
		this.toggle_all = qs("#state-all")
		this.toggle_active = qs("#state-active")
		this.toggle_deactive = qs("#state-deactive")

	}
	getItem(){
		var temp = this.input.value;
		console.log(temp)
		this.input.value = "";
		return temp;
	}
	updateItem(status, data){
		console.log(data, this.list)
		if (status === "add"){ //add{
			const li = dc("li");
			li.setAttribute("class", "todo-item");
			li.setAttribute("key", data.key);
			li.innerHTML = `
			<p>${data.name}</p>
			<button class="todo-item-delete" key="${data.key}">X</button>
			`
			this.list.appendChild(li);
		}
		else if (status === "delete"){
			this.list.removeChild(data);
		}
	}
	_bindEvent(selector, eventType, callback){
		const targetlist = qsa(selector);
		targetlist.length > 0 && targetlist.forEach(target => target.addEventListener(eventType, callback));
		
	}
	bindEvent(type, callback, param){ //일종의 데이터 초기화
		// type: 이벤트 타입
		switch (type) {
			case "submitInput" :
				this.input_container.addEventListener("submit", (e) => {
					e.preventDefault();
					callback(this.getItem().trim())}
				);
				break;
			case "deleteBtn" :
				this.list.addEventListener("click", callback);
				// this.list.appendChild(newItem(param)); this is render
				break;
			case "editItemStatus" :
				break ;
		}
	}
	
		
}
