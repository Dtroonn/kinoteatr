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
import { IFilm } from "pages/api/films";
import { ParsedUrlQuery } from "querystring";
import clsx from "clsx";
import Link from "next/link";

const KinoafishaPage: NextPage<{ films: IFilm[]; category: "cinema" | "theatre" }> = ({
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
                            В прокате 39 фильмов
                        </Typography>
                    </div>
                    <Grid
                        container
                        rowSpacing={5}
                        columnSpacing={{ xs: 1.5, sm: 3, md: 4.5, lg: 4, xl: 3.5 }}>
                        {films.map((film, index) => (
                            <Grid key={index} item xs={6} sm={4} md={3} lg={2.4} xl={2}>
                                <Link href={`/film/${index}`}>
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

interface IParams extends ParsedUrlQuery {
    slug: string;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const availableSlugs = ["cinema", "theatre"];
    const { slug } = context.params as IParams;
    if (!availableSlugs.includes(slug)) {
        return {
            notFound: true,
        };
    }

    const { data } = await axios.get("http://localhost:3000/api/films", {
        params: {
            category: slug,
        },
    });

    return {
        props: {
            films: data.items,
            category: slug,
        },
    };
};

export default KinoafishaPage;
