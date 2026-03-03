import { ICinema } from './cinema.interface';
import { IHall } from './hall.interface';
import { ITicket } from './ticket.interface';

export interface IFilmSession {
	id: number;
	date: string;
	timestampWithoutTime: string;
	price: number;
	hallId: number;
	cinema?: ICinema;
	cinemaId: number;
	filmId: number;
	tickets: ITicket[];
	film?: {
		id: number;
		name: string;
		ageRaiting: number;
	};
	hall?: IHall;
}
