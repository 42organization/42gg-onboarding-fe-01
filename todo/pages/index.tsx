import React, { useState, useEffect, ChangeEvent } from 'react';
import styles from 'styles/index.module.scss';
import SideBar from '@/components/SideBar';
import Todo from '@/utils/todo';

//recoils(전역변수같은)

export default function Home() {
	const [todoInput, setTodoInput] = useState<string>(''); // 입력값
	const [todoList, setTodoList] = useState<Todo[]>([]); // 전체 목록
	const [todoId, setTodoId] = useState<number>(0); // 할 일 ID
	const [deletedTodoList, setDeletedTodoList] = useState<Todo[]>([]); // 삭제 목록
	const [doneTodoList, setDoneTodoList] = useState<Todo[]>([]); //완료 목록

	const TODO = 'todos';
	const DELTODO = "deletedTodos";
	const DONETODO = "doneTodos";

	// 입력값을 처리하는 함수
	const handleTodoInput = (text: ChangeEvent<HTMLInputElement>) => {
		setTodoInput(text.target.value);
	};

	// 페이지 로드 시 로컬 스토리지에서 저장된 할 일 목록을 불러오는 useEffect
	useEffect(() => {
		const savedTodo = localStorage.getItem(TODO);
		if (savedTodo) {
			const todos: Todo[] = JSON.parse(savedTodo);
			setTodoList(todos);
			const lastId = todos.length > 0 ? todos[todos.length - 1].id + 1 : 0;
			setTodoId(lastId);
		}

		const deletedTodo = localStorage.getItem(DELTODO);
		if (deletedTodo) {
			const delTodos : Todo[] = JSON.parse(deletedTodo);
			setDeletedTodoList(delTodos);
		}

		const doneTodo = localStorage.getItem(DONETODO);
		if (doneTodo) {
			const doneTodos : Todo[] = JSON.parse(doneTodo);
			setDoneTodoList(doneTodos);
		}
	}, []);

	// todoList가 변경될 때마다 로컬 스토리지에 저장하는 useEffect
	useEffect(() => {
		if (todoList) {
			localStorage.setItem(TODO, JSON.stringify(todoList));
		}
	}, [todoList]);

	useEffect(() => {
		if (deletedTodoList) {
			localStorage.setItem(DELTODO, JSON.stringify(deletedTodoList));
		}
	}, [deletedTodoList]);

	useEffect(() => {
		if (doneTodoList) {
			localStorage.setItem(DONETODO, JSON.stringify(doneTodoList));
		}
	}, [doneTodoList]);

	// 할 일 추가 함수
	const addTodo = () => {
		const newTodo: Todo = {
			id: todoId,
			text: todoInput,
			done: false,
		};

		setTodoList((prev) => [...prev, newTodo]);
		setTodoId(todoId + 1);
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
