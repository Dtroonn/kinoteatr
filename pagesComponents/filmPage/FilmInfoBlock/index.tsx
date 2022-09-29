import { Typography } from "@mui/material";
import clsx from "clsx";
import React from "react";

import classes from "./FilmInfoBlock.module.scss";

const TextRow: React.FC<{ title: string; value: string; className?: string }> = ({
  title,
  value,
  className,
}) => {
  return (
    <div className={clsx(classes["text-row"], className)}>
      <Typography variant="body2" color="white" className={classes["text-row__title"]}>
        {title}
      </Typography>
      <Typography variant="body2" color="white">
        {value}
      </Typography>
    </div>
  );
};

export const FilmInfoBlock = () => {
  return (
    <div className={classes["film-info"]}>
      <Typography variant="h5" color="white" className={classes["film-info__title"]}>
        СЕРДЦЕ ПАРМЫ
      </Typography>
      <div className={classes["film-info__year-city-time"]}>
        <Typography variant="body2" color="white">
          {"(2021, Россия)"}
        </Typography>
        <Typography variant="body2" color="white" className={classes["film-info__time"]}>
          2 ч. 39 мин.
        </Typography>
      </div>
      <Typography variant="body2" color="white" className={classes["film-info__age-rate"]}>
        16+
      </Typography>
      <Typography variant="body2" color="white" className={classes["film-info__description"]}>
        Князь Михан был рожден в языческих таежных землях – там, где шаманы приносили кровавые
        жертвы, чтобы отогнать темных духов и сохранить равновесие. Здесь он встретил ту, в которой
        – вся красота мира и сила ведьмы-ламии. Ту, быть с которой ему запрещают законы. Эта любовь
        навсегда изменит судьбу Михана и его родной пармы. Ему предстоит сражаться, защищая свой мир
        от злого рока и от тех, кто придет с мечом в поисках богатств и новых земель. По
        одноименному бестселлеру Алексея Иванова.
      </Typography>
      <TextRow
        title="Жанр"
        value="Эпическая Экшн-Драма"
        className={classes["film-info__text-row"]}
      />
      <TextRow
        title="Режиссер"
        value="Антон Мегердичев"
        className={classes["film-info__text-row"]}
      />
      <TextRow
        title="В ролях"
        value="Александр Кузнецов, Евгений Миронов, Елена Ербакова, Сергей Пускепалис, Федор Бондарчук, Виталий Кищенко, Елена Панова, Роза Хайруллина, Михаил Евланов, Валентин Цзин"
        className={classes["film-info__text-row"]}
      />
    </div>
  );
};
