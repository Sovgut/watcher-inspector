export function persistedState<T = unknown, K = unknown>(key: string, initial: K): T | K {
	const persisted = localStorage.getItem(key);
	if (persisted) {
		const parsed = JSON.parse(persisted);

		return parsed as T;
	}

	return initial;
}
