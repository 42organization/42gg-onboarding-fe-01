import React, { useState, useEffect, ChangeEvent } from 'react';
import { Todo, TODOS, DELS, DONES } from '@/types/todo';
import useLocalStorage from '@/hooks/useLocalStorage';

export default function Trash() {
	const [todoList, setTodoList] = useLocalStorage<Todo[]>(TODOS, []); // 전체 목록
	const [deletedTodoList, setDeletedTodoList] = useLocalStorage<Todo[]>(DELS, []); // 삭제 목록	

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
