import React, { useState, useEffect, ChangeEvent } from 'react';
import { Todo, TODOS, DELS, DONES } from '@/types/todo';
import useLocalStorage from '@/hooks/useLocalStorage';

export default function Trash() {
	const [todoList, setTodoList] = useState<Todo[]>([]);
	const [deletedTodoList, setDeletedTodoList] = useState<Todo[]>([]); // 삭제 목록

	useEffect(() => {
		const savedTodo = localStorage.getItem(TODOS);
		if (savedTodo) {
			const todos: Todo[] = JSON.parse(savedTodo);
			setTodoList(todos);
		}

		const deletedTodo = localStorage.getItem(DELS);
		if (deletedTodo) {
			const delTodos : Todo[] = JSON.parse(deletedTodo);
			setDeletedTodoList(delTodos);
		}
	}, []);

	useEffect(() => {
		if (todoList) {
			localStorage.setItem(TODOS, JSON.stringify(todoList));
		}
	}, [todoList]);

	useEffect(() => {
		if (deletedTodoList) {
			localStorage.setItem(DELS, JSON.stringify(deletedTodoList));
		}
	}, [deletedTodoList]);

	const restoreTodo = (id: number) => {
		setDeletedTodoList((prev) => prev.filter(todo => todo.id !== id));
		
		const restoreTodo = deletedTodoList.find(todo => todo.id === id);
		if (restoreTodo) {
			setTodoList((prev) => [...prev, restoreTodo]);
		}
	}

	return (
		<div className="todoForm">
			<div className="deletedTodoList">
				{deletedTodoList.map((it) => (
					<div className="line" key={it.id}>
						<input type="checkbox" checked={it.done} />
						<span>{it.text}</span>
						<button className="restoreBtn" onClick={() => restoreTodo(it.id)}>복구</button>
					</div>
				))}
			</div>
		</div>
	)
}
