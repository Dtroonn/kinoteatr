import React from "react";
import Typography from "@mui/material/Typography";

import classes from "./CinemaInfo.module.scss";
import Grid from "@mui/material/Grid";
import { ICinemaInfoProps } from "./CinemaInfo.props";

export const CinemaInfo: React.FC<ICinemaInfoProps> = ({ name, address, metroStations }) => {
    return (
        <div>
            <Typography color="white" variant="subtitle1">
                {name}
            </Typography>
            <Typography variant="subtitle2" className={classes["cinema-info__address"]}>
                {address}
            </Typography>
            <div className={classes["metro-stations"]}>
                <Grid container rowSpacing={1} columnSpacing={2}>
                    {!!metroStations?.length && metroStations.map((item, idx) => (
                        <Grid item key={idx}>
                            <div className={classes["metro-stations__item"]}>
                                <span
                                    style={{ background: item.branchColor }}
                                    className={classes["metro-stations__branch"]}></span>
                                <Typography
                                    variant="body2"
                                    className={classes["metro-stations__title"]}>
                                    {item.title}
                                </Typography>
                            </div>
                        </Grid>
                    ))}
                </Grid>
            </div>
        </div>
    );
};
