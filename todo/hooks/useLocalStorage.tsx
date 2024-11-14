import { useState, useEffect, Dispatch, SetStateAction } from 'react';
import { Todo } from '@/types/todo';

export default function useLocalStorage(key: string): [Todo[], Dispatch<SetStateAction<Todo[]>>]{
  const [isClient, setIsClient] = useState(false); 
  const [data, setData] = useState<Todo[]>([]);

  // 클라이언트가 렌더링되었을 때 isClient 플래그를 true로 설정
  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    // 첫 렌더링시 로컬스토리지 데이터 가져오기
    if (isClient) {
      const item = localStorage.getItem(key);
      setData(item ? JSON.parse(item) : []);
    }
  }, [isClient]);

  useEffect(() => {
    // 로컬스토리지 데이터 삭제-추가시 작동
    if (isClient) {
      localStorage.setItem(key, JSON.stringify(data));
    }
  }, [isClient, data]);

  return [data, setData];
}




