import React from "react";
import Image from "next/image";

import classes from "./FilmCard.module.scss";
import Typography from "@mui/material/Typography";
import { IFilm } from "types/film.interface";

export const FilmCard: React.FC<IFilm> = ({ name, ageRaiting, genres, imgUrl, tag }) => {
    const genresNames = genres.map((item) => item.genre.name)

    return (
        <div className={classes["film-card"]}>
            <div className={classes["film-card__top"]} style={{ background: tag?.color }}>
                {tag && (
                    <div className={classes["film-card-tag"]}>
                        <Typography
                            className={classes["film-card-tag__title"]}
                            variant="body1"
                            color="white">
                            {tag.title}
                        </Typography>
                    </div>
                )}
                <div className={classes["film-card__img-wrapper"]}>
                    <Image
                        layout="fill"
                        src={imgUrl}
                        alt="lalka"
                        objectFit="cover"
                        objectPosition="center"
                        loading="lazy"
                    />
                </div>
            </div>
            <div className={classes["film-card__age-and_genres"]}>
                <Typography
                    color="white"
                    variant="body2"
                    component="span"
                    className={classes["film-card__age-rating"]}>
                    {ageRaiting}+
                </Typography>{" "}
                <Typography
                    className={classes["film-card__genres"]}
                    variant="body2"
                    component="span"
                    color="gray">
                    {genresNames.join(', ')}
                </Typography>
            </div>
            <Typography variant="body1" color="white">
                {name}
            </Typography>
        </div>
    );
};
