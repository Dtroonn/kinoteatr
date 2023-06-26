import type { NextApiRequest, NextApiResponse } from "next";

// export interface IFilmType {
//     name: string;
//     alias: "" | "soon";
// }

// const filmTypes: IFilmType[] = [
//     {
//         id: 1,
//         title: "Уже в кино",
//         slug: "now",
//     },
//     {
//         id: 2,
//         title: "Скоро на экранах",
//         slug: "soon",
//     },
//     {
//         id: 3,
//         title: "Пушкинская карта",
//         slug: "pushkin_card",
//     },
// ];

// export default function handler(req: NextApiRequest, res: NextApiResponse<IFilmType[]>) {
//     const { category } = req.query;
//     if (category === "theatre") {
//         res.status(200).json([]);
//     } else if (category === "cinema") {
//         res.status(200).json(filmTypes);
//     } else {
//         res.status(200).json(filmTypes);
//     }
// }
