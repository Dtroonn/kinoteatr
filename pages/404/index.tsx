import { Typography } from "@mui/material";
import { NextPage } from "next";
import React from "react";
import classes from "./NotFoundPage.module.scss";

const NotFoundPage: NextPage = () => {
    return (
        <div className={classes.page}>
            <div className={classes.page__content}>
                <Typography variant="h6" color="white">
                    Страница не найдена
                </Typography>
            </div>
        </div>
    );
};

export default NotFoundPage;
