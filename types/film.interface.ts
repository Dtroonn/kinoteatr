import { FilmCategory } from "./enums";
import { IFilmSession } from "./filmSession.interface";
import { IGenre } from "./genre.interface";

interface IFilmGenre {
    id: number;
    genreAlias: string;
    filmId: number;
    genre: IGenre;
}

export interface IFilm {
    id: number;
    name: string;
    ageRaiting: number;
    imgUrl: string;
    director: string;
    casts: string[];
    genres: IFilmGenre[];
    description: string;
    issueYear: number;
    country: string;
    durationMins: number;
    categoryAlias: FilmCategory;
    createdAt: string;
    filmSessions: IFilmSession[];
}