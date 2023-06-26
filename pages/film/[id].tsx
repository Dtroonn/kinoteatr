import { NextPage, GetStaticProps, GetStaticPaths } from "next";
import React from "react";

import Grid from "@mui/material/Grid";

import classes from "./FilmPage.module.scss";

import clsx from "clsx";
import { FilmSlider } from "pagesComponents/filmPage/FilmSlider";
import { FilmInfoBlock } from "pagesComponents/filmPage/FilmInfoBlock";
import { useRouter } from "next/router";
import { CinemaScreeningSchedule } from "pagesComponents/filmPage/CinemaScreeningSchedule";
import axios from "axios";
import { IFilm } from "types/film.interface";
import { ParsedUrlQuery } from "querystring";
import { FilmPageContextProvider } from "contexts/FilmPage.context";

const FilmPage: React.FC<FilmPageProps> = ({ film }) => {
    const router = useRouter();

    if(router.isFallback) {
        return null
    }


    return (
        <FilmPageContextProvider film={film}>
            <div className={classes.page}>
                <div className={clsx("_container", classes.page__container)}>
                    <Grid container columnSpacing={6} rowSpacing={2}>
                        <Grid item xs={12} lg={6}>
                            <FilmSlider />
                        </Grid>
                        <Grid item xs={12} lg={6}>
                            <FilmInfoBlock />
                        </Grid>
                    </Grid>
                    <CinemaScreeningSchedule className={classes["page__cinema-screening-schedule"]} />
                </div>
            </div>
        </FilmPageContextProvider>
    );
};

interface FilmPageProps {
    film: IFilm;
}

export const getStaticPaths: GetStaticPaths = () => {
    return {
        paths: [],
        fallback: true,
    }
}

export const getStaticProps: GetStaticProps<FilmPageProps> = async ({params}) => {

    const { data } = await axios.get<IFilm>(`http://localhost:3444/api/films/${params!.id}`)

    return {
        props: {
            film: data,
        },
        revalidate: 60,
    }
}

export default FilmPage;
