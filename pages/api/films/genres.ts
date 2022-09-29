import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse<IFilmGenre[]>) {
    const { category } = req.query;
    if (category === "theatre") {
        res.status(200).json(theatreGenres);
    } else if (category === "cinema") {
        res.status(200).json(cinemaGenres);
    } else {
        res.status(200).json([...theatreGenres, ...cinemaGenres]);
    }
}

export interface IFilmGenre {
    id: number;
    title: string;
    slug:
        | "documentary"
        | "opera"
        | "ballet"
        | "performance"
        | "drama"
        | "comedy"
        | "melodrama"
        | "thriller"
        | "detective"
        | "scienceFiction"
        | "horror"
        | "romance";
}

const cinemaGenres: IFilmGenre[] = [
    {
        id: 5,
        title: "драма",
        slug: "drama",
    },
    {
        id: 6,
        title: "комедия",
        slug: "comedy",
    },
    {
        id: 7,
        title: "мелодрама",
        slug: "melodrama",
    },
    {
        id: 8,
        title: "боевик",
        slug: "thriller",
    },
    {
        id: 10,
        title: "детектив",
        slug: "detective",
    },
    {
        id: 11,
        title: "фантастика",
        slug: "scienceFiction",
    },
    {
        id: 12,
        title: "ужасы",
        slug: "horror",
    },
    {
        id: 12,
        title: "романтика",
        slug: "romance",
    },
];

const theatreGenres: IFilmGenre[] = [
    {
        id: 1,
        title: "документальный",
        slug: "documentary",
    },
    {
        id: 2,
        title: "опера",
        slug: "opera",
    },
    {
        id: 3,
        title: "балет",
        slug: "ballet",
    },
    {
        id: 4,
        title: "спектакль",
        slug: "performance",
    },
];
