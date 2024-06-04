import Controller from './Controller.js';
import View from './view.js';
import Model from './model.js';

export default function App() {
    // this.storage = new Store(name);
    // this.model = new Model(this.storage);
    // this.template = new Template();
    // this.view = new View(this.template);

	this.model = new Model();
    this.view = new View();
    this.controller = new Controller(this.model, this.view);

}


