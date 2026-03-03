import { IBarProductOrder } from 'components/BuyingTicketsPopup/BuyingTicketsPopup.context';
import { IBarProduct } from 'types/barProduct.interface';

export interface BarProductProps {
	id: number;
	imgUrl: string;
	count?: number;
	name: string;
	description: string;
	products: IBarProduct[];
	price: number | null;
	discountPercentage: number | null;
	onAdd: (product: IBarProductOrder) => void;
	onRemove: (productId: number) => void;
}
