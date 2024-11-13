import { useState, useEffect } from 'react';
import { useRecoilState } from "recoil";
import { lastTodoId } from "@/types/todoId";
import { Todo } from '@/types/todo'

export default function useLocalStorage<Todo>(key: string, initialValue: Todo) {
 const [state, setState] = useState<Todo[]>();

  useEffect(() => {
	if (typeof window !== 'undefined') {
		const item = localStorage.getItem(key);
		if (item && item !== 'undefined') {
			const todos : Todo[] = JSON.parse(item);
			setState(todos);
		}
	}
}, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(key, JSON.stringify(state));
    }
  }, [state]);

  return [state, setState] as const;
}



