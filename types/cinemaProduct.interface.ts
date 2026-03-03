export interface ICinemaProduct {
	id: number;
	cinemaId: number;
	barProductId: number;
	price: number | null;
	discountPercentage: number | null;
}
