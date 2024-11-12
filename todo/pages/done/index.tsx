import React, { useState, useEffect, ChangeEvent } from 'react';
import Todo from '@/utils/todo';

export default function Done() {
    const [todoList, setTodoList] = useState<Todo[]>([]); // 전체 목록
    const [doneTodoList, setDoneTodoList] = useState<Todo[]>([]);
    
    const TODO = "todos";
    const DONETODO = "doneTodos";

    useEffect(() => {
        const savedTodo = localStorage.getItem(TODO);
		if (savedTodo) {
			const todos: Todo[] = JSON.parse(savedTodo);
			setTodoList(todos);
		}

		const doneTodo = localStorage.getItem(DONETODO);
		if (doneTodo) {
			const doneTodos : Todo[] = JSON.parse(doneTodo);
			setDoneTodoList(doneTodos);
		}
	}, []);

    useEffect(() => {
		if (todoList) {
			localStorage.setItem(TODO, JSON.stringify(todoList));
		}
	}, [todoList]);

	useEffect(() => {
		if (doneTodoList) {
			localStorage.setItem(DONETODO, JSON.stringify(doneTodoList));
		}
	}, [doneTodoList]);

	const restoreTodo = (id: number) => {
        setDoneTodoList((prev) => prev.filter(todo => todo.id !== id));
		
		const restoreTodo = doneTodoList.find(todo => todo.id === id);
		if (restoreTodo) {
			restoreTodo.done = !restoreTodo.done;
			setTodoList((prev) => [...prev, restoreTodo]);
		}
	}

	return (
		<div className="todoForm">
			<div className="doneTodoList">
				{doneTodoList.map((it) => (
					<div className="line" key={it.id}>
						<input type="checkbox" checked={it.done} onChange={() => restoreTodo(it.id)} />
						<span>{it.text}</span>
						<button className="delBtn" onClick={() => {}}>삭제</button>
					</div>
				))}
			</div>
		</div>
	)
}