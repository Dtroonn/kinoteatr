import dayjs from 'dayjs';
import { ITicket } from 'types/ticket.interface';

export const groupTicketsBySeatRow = (items: ITicket[]): Record<string, ITicket[]> => {
	return items.reduce<Record<string, ITicket[]>>((prev, ticket) => {
		const row = String(ticket.seat.row);
		if (!prev[row]) {
			prev[row] = [ticket];
		} else {
			prev[row].push(ticket);
		}

		return prev;
	}, {});
};

export const getDayOfWeek = (timestamp: string) => {
	const date = dayjs(timestamp);
	if (date.isToday()) {
		return 'сегодня';
	}

	if (date.isTomorrow()) {
		return 'завтра';
	}

	return date.format('dddd');
};
