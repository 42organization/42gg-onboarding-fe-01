export interface Todo {
	id: string;
	text: string;
	done: boolean;
}

export const TODOS = "todos";
export const DELS = "deletedTodos";
export const DONES = "doneTodos";