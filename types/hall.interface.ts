import { ISeat } from './seat.interface';

export interface IHall {
	id: number;
	number: number;
	typeAlias: string | null;
	cinemaId: number;
	type: null | string;
	seats?: ISeat[];
}
