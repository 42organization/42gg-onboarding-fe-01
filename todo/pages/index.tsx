import React, { useState, useEffect, ChangeEvent } from 'react';
import { Todo, TODOS, DELS, DONES } from '@/types/todo';
import useLocalStorage from '@/hooks/useLocalStorage';
import { nanoid } from 'nanoid';

export default function Home() {

	const [todoInput, setTodoInput] = useState<string>(''); // 입력값
	const [todoList, setTodoList] = useLocalStorage(TODOS); // 전체 목록
	const [deletedTodoList, setDeletedTodoList] = useLocalStorage(DELS); // 삭제 목록
	const [doneTodoList, setDoneTodoList] = useLocalStorage(DONES); //완료 목록
  

	const handleTodoInput = (text: ChangeEvent<HTMLInputElement>) => {
		setTodoInput(text.target.value);
	};

	// todo 추가
	const addTodo = () => {
		const newTodo: Todo = {
			id: nanoid(),
			text: todoInput,
			done: false,
		};

		setTodoList((prev) => [...prev, newTodo]);
		setTodoInput('');
	};

	// Enter 키로 todo 추가
	const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter' && !e.nativeEvent.isComposing) {
			addTodo();
		}
	};

	// todo 삭제
	const deleteTodo = (id: string) => {
		const delTodo = todoList.find(todo => todo.id === id);
		if (delTodo) {
			setDeletedTodoList((prev) => [...prev, delTodo]);
		}

		setTodoList((prev) => prev.filter(todo => todo.id !== id));
	};

	// 체크박스 상태 변화 함수 -> 완료 목록으로 이동
	const updateCheckbox = (id: string) => {
		const doneTodo = todoList.find(todo => todo.id === id);
		if (doneTodo) {
			doneTodo.done = !doneTodo.done;
			setDoneTodoList((prev) => [...prev, doneTodo]);
		}
		
		setTodoList((prev) => prev.filter(todo => todo.id !== id));
	}

	return (
		<div className="todoForm">
				<div className="todoInput">
					<div>
					<input 
						value={todoInput} 
						placeholder="할 일을 입력하세요" 
						onChange={handleTodoInput} 
						onKeyDown={handleKeyPress}
					/>
					</div>
				</div>
				<div className="todoList">
					{todoList.map((it) => (
					<div className="line" key={it.id}>
						<input type="checkbox" checked={it.done} onChange={() => updateCheckbox(it.id)} />
						<span>{it.text}</span>
						<button className="delBtn" onClick={() => deleteTodo(it.id)}>삭제</button>
					</div>
					))}
				</div>
			</div>
	);
}

