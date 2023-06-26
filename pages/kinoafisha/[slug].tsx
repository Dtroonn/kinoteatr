import { GetServerSideProps, NextPage } from "next";
import React from "react";
import axios from "axios";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

import classes from "./KinoafishaPage.module.scss";
import { NavigationTabs } from "components/NavigationTabs";
import { FilmsFilters } from "components/FilmsFilters";
import { FilmCard } from "components/FilmCard";
import { IFilm } from "types/film.interface";
import { ParsedUrlQuery } from "querystring";
import clsx from "clsx";
import Link from "next/link";
import { useRouter } from "next/router";

const KinoafishaPage: React.FC<KinoafishaPageProps> = ({
    films,
    category,
}) => {
    return (
        <div className={classes.page}>
            <div className={clsx("_container", classes.page__container)}>
                <div className={classes["page__tabs-wrapper"]}>
                    <NavigationTabs
                        key={category}
                        tabs={[
                            {
                                path: "/kinoafisha/cinema",
                                label: "Кино",
                            },
                            {
                                path: "/kinoafisha/theatre",
                                label: "Театр",
                            },
                            {
                                path: "/events",
                                label: "События",
                            },
                        ]}
                    />
                </div>

                <FilmsFilters key={category} category={category} />

                <div className={classes["page__content"]}>
                    <div className={classes["head-block"]}>
                        <Typography variant="h5" component="span" color="white">
                            В продаже в кинотеатрах Воронежа
                        </Typography>
                        <Typography
                            className={classes["head-block__label"]}
                            variant="body2"
                            component="span"
                            color="white">
                            В прокате {films.length} фильмов
                        </Typography>
                    </div>
                    <Grid
                        container
                        rowSpacing={5}
                        columnSpacing={{ xs: 1.5, sm: 3, md: 4.5, lg: 4, xl: 3.5 }}>
                        {films.map((film, index) => (
                            <Grid key={index} item xs={6} sm={4} md={3} lg={2.4} xl={2}>
                                <Link href={`/film/${film.id}`}>
                                    <a>
                                        <FilmCard {...film} />
                                    </a>
                                </Link>
                            </Grid>
                        ))}
                    </Grid>
                </div>
            </div>
        </div>
    );
};

interface KinoafishaPageProps {
    films: IFilm[]; 
    category: "cinema" | "theatre";
}

interface IParams extends ParsedUrlQuery {
    slug: KinoafishaPageProps['category'];
}

export const getServerSideProps: GetServerSideProps<KinoafishaPageProps> = async ({params, query}) => {
    
    const availableSlugs = ["cinema", "theatre"];
    const { slug } = params as IParams;
    if (!availableSlugs.includes(slug)) {
        return {
            notFound: true,
        };
    }

    const { data } = await axios.post<IFilm[]>("http://localhost:3444/api/films/find", {
        category: slug,
        date: query.date,
        genre: query.genre,
        filmType: query.type,
        cityAlias: "voronezh",
    });

    return {
        props: {
            films: data,
            category: slug,
        },
    };
};

export default KinoafishaPage;
