let todoArr = [];
let doneArr = [];

function render(list) {
    const fragment = new DocumentFragment();

    let div = document.createElement('div');
    div.setAttribute("id", list);
    fragment.appendChild(div);

    for (content of todoArr) {
        let ol = document.createElement('ol');
        let checkbox = document.createElement('input');
        checkbox.setAttribute('type', 'checkbox');
        checkbox.setAttribute('id', 'checkbox-'+content);

        let p = document.createElement('label');
        p.setAttribute('for', 'list');
        p.append(content);

        let deleteButton = document.createElement('input');
        deleteButton.setAttribute("value", 'delete');
        deleteButton.setAttribute("type", 'button');
        deleteButton.setAttribute("id", content);
        deleteButton.setAttribute("onclick", 'deleteTodo(id)');

        div.appendChild(ol);
        ol.appendChild(checkbox);
        ol.appendChild(p);
        ol.appendChild(deleteButton);
    }

    
    const todoList = document.getElementById('todo-list');
    todoList.replaceChildren(fragment);
}

function deleteTodo(type) {
    let idx = todoArr.indexOf(type);
    if (idx === -1) return;
    todoArr.splice(idx, 1);
    render('todo-list');
    render('done-list');
}

function createTodo() {
    let input = document.getElementById('input').value;
    if (!input) return ;
    todoArr.push(input);
    todoArr.sort();
    render('todo-list');
    render('done-list');
}

// TODO you create done function
function clickCheckbox(type) {
    let idx = todoArr.indexOf(type);
    if (idx === -1) return;
    todoArr.splice(idx, 1);
    doneArr.push(type);
    render('todo-list');
    render('done-list');
}