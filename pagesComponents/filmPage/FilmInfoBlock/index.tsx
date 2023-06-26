import { Typography } from "@mui/material";
import clsx from "clsx";
import React from "react";

import classes from "./FilmInfoBlock.module.scss";
import { FilmPageContext } from "contexts/FilmPage.context";
import dayjs from "dayjs";
import duration from 'dayjs/plugin/duration'
dayjs.extend(duration)

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
  const {film} = React.useContext(FilmPageContext);

  const genresNames = film.genres.map((genre) => genre.genre.name)

  return (
    <div className={classes["film-info"]}>
      <Typography variant="h5" color="white" className={classes["film-info__title"]}>
        {film.name}
      </Typography>
      <div className={classes["film-info__year-city-time"]}>
        <Typography variant="body2" color="white">
          {`(${film.issueYear}, ${film.country})`}
        </Typography>
        <Typography variant="body2" color="white" className={classes["film-info__time"]}>
          {dayjs.duration(film.durationMins, 'minutes').format('H ч. mm мин.')}
        </Typography>
      </div>
      <Typography variant="body2" color="white" className={classes["film-info__age-rate"]}>
        {film.ageRaiting}+
      </Typography>
      <Typography variant="body2" color="white" className={classes["film-info__description"]}>
        {film.description}
      </Typography>
      <TextRow
        title="Жанр"
        value={genresNames.join(', ')}
        className={classes["film-info__text-row"]}
      />
      <TextRow
        title="Режиссер"
        value={film.director}
        className={classes["film-info__text-row"]}
      />
      <TextRow
        title="В ролях"
        value={film.casts.join(', ')}
        className={classes["film-info__text-row"]}
      />
    </div>
  );
};
