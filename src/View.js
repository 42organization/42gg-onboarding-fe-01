export default class View {
	constructor(viewModel) {
		this.app = document.getElementById('root');

		this.todoForm = document.getElementById('todo-form');
		this.todoInput = document.getElementById('todo-input');
		this.todoList = document.querySelector('.todo-list');

    this.viewModel = viewModel;
    this.viewModel.todoListChanged = this.updateView; // callback

		this.addSubmitEventListeners();
	}

  createTodoItem({id, text, completed, checked}) {
    const item = document.createElement('li');
    item.setAttribute('data-id', id);
    item.className = `item ${completed}`;

    item.innerHTML = `
        <div class="item-line">
            <input class="toggle" type="checkbox" ${checked}>
            <label>${text}</label>
            <button class="destroy">X</button>
        </div>
    `;

    return item;
  }

  updateView = (todoList) => {
    this.todoList.innerHTML = '';

    todoList.forEach(todo => {
        const todoItem = this.createTodoItem({
            id: todo.id,
            text: todo.text,
            completed: todo.completed ? 'completed' : '',
            checked: todo.completed ? 'checked' : '',
        });
        this.todoList.appendChild(todoItem);
    });

    this.addEventListeners();
  }

	addSubmitEventListeners()
	{
		this.todoForm.addEventListener('submit', (e) => {
			e.preventDefault();
			const todoText = this.todoInput.value.trim();

			if (todoText !== '') {
        this.viewModel.addTodo(todoText);
				this.todoInput.value = '';
			}
		});
	}

  addEventListeners() {
    this.addDeleteListeners();
    this.addEditListeners();
    this.addToggleListeners();
  }

  addDeleteListeners() {
    this.todoList.querySelectorAll('.destroy').forEach(button => {
        button.addEventListener('click', (e) => {
            const id = parseInt(e.target.closest('li').dataset.id);
            this.viewModel.deleteTodo(id);
        });
    });
  }

  addEditListeners() {
    this.todoList.querySelectorAll('label').forEach(label => {
        label.addEventListener('dblclick', (e) => {
            this.makeLabelEditable(label);
        });
    });
  }

  makeLabelEditable(label) {
    const id = parseInt(label.closest('li').dataset.id);
    const originalContent = label.innerText;

    label.contentEditable = true;
    label.focus();

    const finishEdit = () => {
        const newText = label.innerText.trim();
        if (newText && newText !== originalContent) {
            this.viewModel.editTodo(id, newText);
        }
        label.contentEditable = false;
        label.removeEventListener('blur', finishEdit);
    };

    label.addEventListener('blur', finishEdit);

    label.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            const newText = label.innerText.trim();
            if (!newText) label.innerText = originalContent;
            label.blur();
        }
    });
  }

  addToggleListeners() {
      this.todoList.querySelectorAll('.toggle').forEach(check => {
          check.addEventListener('change', (e) => {
              const id = parseInt(e.target.closest('li').dataset.id);
              this.viewModel.toggleTodo(id);
          });
      });
  }
}
