import type { NextApiRequest, NextApiResponse } from "next";
import { IHallType } from "../films/[id]/sessionsFilters";

export interface IMetroStation {
    title: string;
    branchColor: string;
}

export interface ISession {
    time: string;
    hallNumber: number;
    hallType: IHallType;
    price: number;
}

export interface ICinema {
    id: number;
    title: string;
    address: string;
    metroStations: IMetroStation[];
    sessions: ISession[];
}

const data: ICinema[] = [
    {
        id: 1,
        title: "Синема Парк Европейский",
        address: "Москва, пл. Киевского Вокзала, 2, ТРЦ «Европейский»",
        metroStations: [
            {
                title: "Киевская",
                branchColor: "transparent",
            },
        ],
        sessions: [
            {
                time: "10:15",
                price: 240,
                hallNumber: 4,
                hallType: {
                    id: 1,
                    title: "Стандарт",
                    slug: "standard",
                },
            },
            {
                time: "12:10",
                price: 740,
                hallNumber: 5,
                hallType: {
                    id: 2,
                    title: "Премиум",
                    slug: "premium",
                },
            },
        ],
    },
    {
        id: 2,
        title: "Синема Парк Ривьера на Автозаводской",
        address: "Москва, ул. Автозаводская, 18, ТРЦ «Ривьера», 3-й этаж",
        metroStations: [
            {
                title: "Автозаводская",
                branchColor: "green",
            },
            {
                title: "Тульская",
                branchColor: "gray",
            },
        ],
        sessions: [
            {
                time: "11:00",
                price: 1040,
                hallNumber: 4,
                hallType: {
                    id: 4,
                    title: "Прайм",
                    slug: "prime",
                },
            },
            {
                time: "18:10",
                price: 820,
                hallNumber: 5,
                hallType: {
                    id: 5,
                    title: "Комфорт",
                    slug: "comfort",
                },
            },
        ],
    },
];

const premiumFilmsData: ICinema[] = [
    {
        id: 1,
        title: "Синема Парк Европейский",
        address: "Москва, пл. Киевского Вокзала, 2, ТРЦ «Европейский»",
        metroStations: [
            {
                title: "Киевская",
                branchColor: "transparent",
            },
        ],
        sessions: [
            {
                time: "12:10",
                price: 740,
                hallNumber: 5,
                hallType: {
                    id: 2,
                    title: "Премиум",
                    slug: "premium",
                },
            },
        ],
    },
]

export default function handler(req: NextApiRequest, res: NextApiResponse<ICinema[]>) {
     const hallsTypes = typeof req.query.sessionHallsTypes === 'string' ? req.query.sessionHallsTypes.split(',') : [];
     if(hallsTypes.includes('premium')) {
        res.json(premiumFilmsData);
        return;
     }

    res.json(data);
}
