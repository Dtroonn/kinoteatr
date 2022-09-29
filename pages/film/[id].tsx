import { NextPage } from "next";
import React from "react";

import Grid from "@mui/material/Grid";

import classes from "./FilmPage.module.scss";

import clsx from "clsx";
import { FilmSlider } from "pagesComponents/filmPage/FilmSlider";
import { FilmInfoBlock } from "pagesComponents/filmPage/FilmInfoBlock";
import { useRouter } from "next/router";
import { ScheduleFilters } from "pagesComponents/filmPage/ScheduleFilters";

const FilmPage: NextPage = () => {
    const router = useRouter();

    console.log("ROUTER query", router.query);
    return (
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
                <ScheduleFilters/>
            </div>
        </div>
    );
};

export default FilmPage;
