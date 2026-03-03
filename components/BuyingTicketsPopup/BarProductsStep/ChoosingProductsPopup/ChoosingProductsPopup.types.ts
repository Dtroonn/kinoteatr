import { IBarProductOrder } from 'components/BuyingTicketsPopup/BuyingTicketsPopup.context';
import { IBarProduct } from 'types/barProduct.interface';

export interface IChoosingProductsPopupProps {
	productName: string;
	productId: number;
	initialCount?: number;
	price: number | null;
	groupedProductsByCategory: IBarProduct[][];
	onAdd: (product: IBarProductOrder) => void;
	onClose: () => void;
	open: boolean;
}
