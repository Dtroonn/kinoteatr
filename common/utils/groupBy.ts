export const groupBy = <T, K extends keyof T>(arr: T[], prop: K): Record<string, T[]> => {
	const result = arr.reduce((prev: Record<string, T[]>, current) => {
		const key = current[prop] as string;
		if (!prev[key]) {
			prev[key] = [current];
		} else {
			prev[key].push(current);
		}

		return prev;
	}, {});

	return result;
};
