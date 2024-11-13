export interface Todo {
	id: number;
	text: string;
	done: boolean;
}

export const TODOS = "todos";
export const DELS = "deletedTodos";
export const DONES = "doneTodos";