export const API_GET_FILM_SESSION_BY_ID = (id: string | number): string =>
	`${process.env.NEXT_PUBLIC_API_URL}films-sessions/${id}`;

export const API_GET_BAR_PRODUCTS_CATEGORIES = `${process.env.NEXT_PUBLIC_API_URL}bar-products-categories`;

export const API_GET_BAR_PRODUCTS = `${process.env.NEXT_PUBLIC_API_URL}bar-products`;
