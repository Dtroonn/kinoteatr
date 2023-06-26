import { IHall } from "./hall.interface";

export interface IFilmSession {
    id: number;
    date: string;
    timestampWithoutTime: string;
    price: number;
    hallId: number;
    cinemaId: number;
    filmId: number;
    hall?: IHall;
}