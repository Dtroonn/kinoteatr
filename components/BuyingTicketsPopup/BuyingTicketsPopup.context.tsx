import React from 'react';
import { IBarProduct } from 'types/barProduct.interface';
import { IBarProductCategory } from 'types/barProductCategory.interface';
import { IFilmSession } from 'types/filmSession.interface';

export interface IBarProductOrder {
	id: number;
	name: string;
	price: number;
	count: number;
	products?: IBarProductOrder[];
}

export interface ITicketOrder {
	id: number;
	price: number;
	row: number;
	place: number;
}

export interface IBuyingTicketsPopupContext {
	filmSession: IFilmSession;
	step: number;
	barProductsCategories: IBarProductCategory[];
	barProducts: Record<string, IBarProduct[]>;
	barProductsOrder: Record<string, IBarProductOrder>;
	ticketsOrder: Record<string, ITicketOrder>;
	ticketsTotalPrice: number;
	totalPrice: number;
	email: string;
	phone: string;
	onChangeEmail: (value: string) => void;
	onChangePhone: (value: stirng) => void;
	onChangeTicketsOrder: (ticket: ITicketOrder) => void;
	onChangeStep: (value: 'futher' | 'back') => void;
	onAddBarProductOrder: (product: IBarProductOrder) => void;
	onRemoveBarProductOrder: (productId: number) => void;
	onClose: () => void;
}

export const BuyingTicketsPopupContext = React.createContext<IBuyingTicketsPopupContext>({
	filmSession: {} as IFilmSession,
	barProductsCategories: [],
	barProducts: {},
	barProductsOrder: {},
	ticketsOrder: {},
	step: 1,
	ticketsTotalPrice: 0,
	totalPrice: 0,
	email: '',
	phone: '',
	onChangeEmail: () => {},
	onChangePhone: () => {},
	onChangeTicketsOrder: () => {},
	onChangeStep: () => {},
	onAddBarProductOrder: () => {},
	onRemoveBarProductOrder: () => {},
	onClose: () => {},
});

type BuyingTicketsPopupContextProviderProps = Omit<
	IBuyingTicketsPopupContext,
	| 'barProductsOrder'
	| 'onAddBarProductOrder'
	| 'onRemoveBarProductOrder'
	| 'ticketsOrder'
	| 'onChangeTicketsOrder'
	| 'ticketsTotalPrice'
	| 'totalPrice'
	| 'email'
	| 'phone'
>;

export const BuyingTicketsPopupContextProvider: React.FC<
	React.PropsWithChildren<BuyingTicketsPopupContextProviderProps>
> = ({
	children,
	filmSession,
	step,
	barProductsCategories,
	barProducts,
	onClose,
	onChangeStep,
}) => {
	const [barProductsOrder, setBarProductsOrder] = React.useState<Record<string, IBarProductOrder>>(
		{},
	);
	const [ticketsOrder, setTicketsOrder] = React.useState<Record<string, ITicketOrder>>({});
	const [email, setEmail] = React.useState<string>('');
	const [phone, setPhone] = React.useState<string>('');

	const onAddBarProductOrder = (product: IBarProductOrder): void => {
		const newProducts = { ...barProductsOrder };
		newProducts[String(product.id)] = product;
		setBarProductsOrder(newProducts);
	};

	const onRemoveBarProductOrder = (productId: number): void => {
		const newProducts = { ...barProductsOrder };
		delete newProducts[productId];
		setBarProductsOrder(newProducts);
	};

	const onChangeTicketsOrder = (ticket: ITicketOrder): void => {
		const newTickets = { ...ticketsOrder };
		if (newTickets[ticket.id]) {
			delete newTickets[ticket.id];
		} else {
			newTickets[ticket.id] = ticket;
		}

		setTicketsOrder(newTickets);
	};

	const onChangeEmail = (value: string) => {
		setEmail(value);
	};

	const onChangePhone = (value: string) => {
		setPhone(value);
	};

	const ticketsTotalPrice: number = Object.values(ticketsOrder).reduce(
		(sum, ticket) => sum + ticket.price,
		0,
	);

	const barProductsTotalPrice: number = Object.values(barProductsOrder).reduce(
		(sum, product) => sum + product.price * product.count,
		0,
	);

	const totalPrice: number = ticketsTotalPrice + barProductsTotalPrice;

	return (
		<BuyingTicketsPopupContext.Provider
			value={{
				filmSession,
				step,
				barProductsCategories,
				barProducts,
				barProductsOrder,
				ticketsOrder,
				ticketsTotalPrice,
				totalPrice,
				email,
				phone,
				onChangeEmail,
				onChangePhone,
				onChangeTicketsOrder,
				onAddBarProductOrder,
				onRemoveBarProductOrder,
				onClose,
				onChangeStep,
			}}
		>
			{children}
		</BuyingTicketsPopupContext.Provider>
	);
};
