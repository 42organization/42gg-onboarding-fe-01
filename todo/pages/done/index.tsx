import React, { useState, useEffect, ChangeEvent } from 'react';
import { Todo, TODOS, DELS, DONES } from '@/types/todo';
import useLocalStorage from '@/hooks/useLocalStorage';


export default function Done() {
    const [todoList, setTodoList] = useLocalStorage(TODOS); // 전체 목록
	const [deletedTodoList, setDeletedTodoList] = useLocalStorage(DELS); // 삭제 목록
	const [doneTodoList, setDoneTodoList] = useLocalStorage(DONES); //완료 목록
  
	const deleteTodo = (id: string) => {
		setDoneTodoList((prev) => prev.filter(todo => todo.id !== id));
		
		const delTodo = doneTodoList.find(todo => todo.id === id);
		if (delTodo) {
			setDeletedTodoList((prev) => [...prev, delTodo]);
		}
	};

	const restoreTodo = (id: string) => {
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
						<button className="delBtn" onClick={() => deleteTodo(it.id)}>삭제</button>
					</div>
				))}
			</div>
		</div>
	)
}