import type { NextApiRequest, NextApiResponse } from "next";

export interface IFilm {
  id: number;
  title: string;
  ageRaiting: number;
  tag: null | {
    title: string;
    color: string;
  };
  imgUrl: string;
  genres: string[];
}

type Data = {
  items: IFilm[];
};

const cinemaData: Data = {
  items: [
    {
      id: 1,
      title: "Сердце пармы",
      ageRaiting: 16,
      tag: {
        title: "Пушкинская карта",
        color: "#EA0088",
      },
      imgUrl: "https://s2.kinoteatr.ru/preview/upload/a1/00/00/88/79/1111111.jpg",
      genres: ["эпическая экшн-драма"],
    },
    {
      id: 2,
      title: "Красная шапочка",
      ageRaiting: 12,
      tag: {
        title: "Пушкинская карта",
        color: "#EA0088",
      },
      imgUrl: "https://s3.kinoteatr.ru/preview/upload/movies/8719/cover.jpg",
      genres: ["фэнтези", "приключения", "семейный"],
    },
  ],
};

const theatreData: Data = {
  items: [
    {
      id: 3,
      title: "TheatreHD: Буря",
      ageRaiting: 16,
      tag: null,
      imgUrl: "https://s2.kinoteatr.ru/preview/upload/a1/00/00/16/42/4672.jpg",
      genres: ["Спектакль"],
    },
  ],
};

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  const { category } = req.query;
  if (category === "theatre") {
    res.status(200).json(theatreData);
  } else if (category === "cinema") {
    res.status(200).json(cinemaData);
  } else {
    res.status(200).json({ items: [] });
  }
}
