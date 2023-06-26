import { ICity } from "./city.interface"
import { IFilmSession } from "./filmSession.interface"

export interface ICinema {
    id: number;
    name: string;
    address: string;
    cityAlias: string;
    city: ICity;
    filmSessions?: IFilmSession[];
}