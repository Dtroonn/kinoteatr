import React from "react";

import Chip from "@mui/material/Chip";
import { TagProps } from "./Tag.props";
import clsx from "clsx";

import classes from "./Tag.module.scss";

export const Tag: React.FC<TagProps> = ({ active, variant = "outlined", className, ...props }) => {
    return (
        <Chip
            variant={variant}
            {...props}
            className={clsx(classes.tag, className, {
                [classes.tag_active]: active,
            })}
            size="medium"
        />
    );
};
