import { ITicketOrder } from 'components/BuyingTicketsPopup/BuyingTicketsPopup.context';

export interface SeatCheckboxProps {
	id: number;
	place: number;
	price: number;
	row: number;
	color: string;
	checked: boolean;
	disabled?: boolean;
	onChange: (item: ITicketOrder) => void;
	isClickable?: boolean;
}
