import { NextApiRequest, NextApiResponse } from "next";

export interface IHallType {
    id: number;
    title: string;
    slug: string;
}

export interface IFilmFormat {
    id: number;
    title: string;
    slug: string;
}

export interface ISessionsFiltersRes {
    formats: IFilmFormat[];
    hallsTypes: IHallType[];
}

const data: ISessionsFiltersRes = {
    formats: [
        {
            id: 1,
            title: "2D",
            slug: "2d",
        },
        {
            id: 2,
            title: "Пушкинская карта",
            slug: "pushkin_card",
        },
    ],

    hallsTypes: [
        {
            id: 1,
            title: "Стандарт",
            slug: "standard",
        },
        {
            id: 2,
            title: "Премиум",
            slug: "premium",
        },
        {
            id: 3,
            title: "KIDS",
            slug: "kids",
        },
        { id: 4, title: "Прайм", slug: "prime" },

        { id: 5, title: "Комфорт", slug: "komfort" },
    ],
};

export default function handler(req: NextApiRequest, res: NextApiResponse<ISessionsFiltersRes>) {
    res.json(data);
}
