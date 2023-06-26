import { IMetroStation } from "pages/api/cinemas";

export interface ICinemaInfoProps {
    name: string;
    address: string;
    metroStations?: IMetroStation[];
}
