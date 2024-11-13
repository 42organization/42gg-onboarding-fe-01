import { useState, useEffect } from 'react';
import { useRecoilState } from "recoil";
import { lastTodoId } from "@/types/todoId";
import { Todo } from '@/types/todo'

function getSavedValue<Todo>(key: string, initialValue: Todo) {
	if (typeof window !== "undefined") {
		const item = localStorage.getItem(key);
    if (item) {
      const todos = JSON.parse(item);
    }
		return item ? JSON.parse(item) : initialValue;
	}
	return initialValue;
  }

export default function useLocalStorage<Todo>(key: string, initialValue: Todo) {
  const [state, setState] = useState<Todo[]>(() => {
    return getSavedValue(key, initialValue);
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(key, JSON.stringify(state));
    }
  }, [state]);

  return [state, setState] as const;
}



