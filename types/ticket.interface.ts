import { ISeat } from './seat.interface';

export interface ITicket {
	id: number;
	filmSessionId: number;
	seatId: number;
	price: number;
	isAvailable: boolean;
	orderId: number;
	seat: ISeat;
}
