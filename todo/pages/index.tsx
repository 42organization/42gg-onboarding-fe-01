import React, { useState, useEffect, ChangeEvent } from 'react';
import styles from 'styles/index.module.scss';
import { Todo, TODOS, DELS, DONES } from '@/types/todo';
import useLocalStorage from '@/hooks/useLocalStorage';
import { lastTodoId } from '@/types/todoId';
import { useRecoilState } from 'recoil';

export default function Home() {

  const [todoInput, setTodoInput] = useState<string>(''); // 입력값
  const [lastId, setLastId] = useRecoilState(lastTodoId);
	const [todoList, setTodoList] = useLocalStorage<Todo[]>(TODOS, []); // 전체 목록
	const [deletedTodoList, setDeletedTodoList] = useLocalStorage<Todo[]>(DELS, []); // 삭제 목록
	const [doneTodoList, setDoneTodoList] = useLocalStorage<Todo[]>(DONES, []); //완료 목록
  

	// 입력값을 처리하는 함수
	const handleTodoInput = (text: ChangeEvent<HTMLInputElement>) => {
		setTodoInput(text.target.value);
	};

	// 할 일 추가 함수
	const addTodo = () => {
		const newTodo: Todo = {
			id: lastId + 1,
			text: todoInput,
			done: false,
		};

		setTodoList((prev) => [...prev, newTodo]);
		setLastId(newTodo.id);
		setTodoInput(''); // 입력값 초기화
	};

	const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter') {
			addTodo();
		}
	};

	// 할 일 삭제 함수
	const deleteTodo = (id: number) => {
		setTodoList((prev) => prev.filter(todo => todo.id !== id));
		
		const delTodo = todoList.find(todo => todo.id === id);
		if (delTodo) {
			setDeletedTodoList((prev) => [...prev, delTodo]);
		}
	};

	// 체크박스 상태 변화 함수 -> 완료 목록으로 이동
	const updateCheckbox = (id: number) => {
		setTodoList((prev) => prev.filter(todo => todo.id !== id));
		
		const doneTodo = todoList.find(todo => todo.id === id);
		if (doneTodo) {
			doneTodo.done = !doneTodo.done;
			setDoneTodoList((prev) => [...prev, doneTodo]);
		}
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

