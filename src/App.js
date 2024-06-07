import ViewModel from './ViewModel.js';
import View from './View.js';
import Model from './Model.js';

export default function App() {
	this.model = new Model();
	this.viewModel = new ViewModel(this.model);
	this.view = new View(this.viewModel);
}

const app = new App();
