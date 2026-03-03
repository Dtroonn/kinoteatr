import { IBarProductCategory } from './barProductCategory.interface';
import { ICinemaProduct } from './cinemaProduct.interface';

export interface IBarProduct {
	id: number;
	name: string;
	description: '';
	imageUrl: string;
	categoryAlias: string;
	productId: null | number;
	products: IBarProduct[];
	cinemasProducts: ICinemaProduct[];
	category: IBarProductCategory;
}
