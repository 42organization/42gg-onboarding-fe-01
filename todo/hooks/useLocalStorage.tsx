import { useState, useEffect } from 'react';

function getSavedValue<T>(key: string, initialValue: T[]): T[] {
	if (typeof window !== "undefined") {
		const item = localStorage.getItem(key);
		return item ? JSON.parse(item) : initialValue;
	}
	return initialValue;
}

export default function useLocalStorage<T>(key: string, initialValue: T[]) {
	const [state, setState] = useState<T[]>(() => {
		return getSavedValue(key, initialValue);
	});

	useEffect(() => {
		if (typeof window !== 'undefined') {
			localStorage.setItem(key, JSON.stringify(state));
		}
	}, [state]);

	// 클라이언트 환경 체크
	const [isClient, setIsClient] = useState(false);

	useEffect(() => {
		setIsClient(true);
	}, []);

	// 클라이언트에서만 상태 반환
	if (isClient) {
		return [state, setState] as const;
	}

	// 서버 렌더링 환경에서는 초기값 반환
	return [initialValue, setState] as const;
}




