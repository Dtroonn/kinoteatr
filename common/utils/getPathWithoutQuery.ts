const parseQueryParams = (params: string): Record<string, string> => {
	const searchParams = new URLSearchParams(params);
	const paramsEntries = searchParams.entries();

	const query: Record<string, string> = {};
	for (const [key, value] of paramsEntries) {
		query[key] = value;
	}

	return query;
};

export const getPathAndQuery = (path: string): { path: string; query: Record<string, string> } => {
	const [pathWithoutQuery, query] = path.split('?');

	const parsedParams = parseQueryParams(query);

	return {
		path: pathWithoutQuery,
		query: parsedParams,
	};
};
