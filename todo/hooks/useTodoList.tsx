import useLocalStorage from "./useLocalStorage";
import Todo from "@/types/todo";
import { useRecoilState } from "recoil";
import { lastTodoId } from "@/types/todoId";

export default function useTodoList<T>() {
    const [todos, setTodos] = useLocalStorage<Todo[]>
    const [todoId, setTodoId] = useRecoilState(lastTodoId);

    

    return [todos, addTodos, delTodos];
}