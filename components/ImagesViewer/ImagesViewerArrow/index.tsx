import { Icon } from "components/Icon";
import React from "react";
import { ImagesViewerArrowProps } from "./ImagesViewerArrow.props";

import classes from "./ImagesViewerArrow.module.scss";

export const ImagesViewerArrow: React.FC<ImagesViewerArrowProps> = ({ onClick }) => {
    return (
        <button className={classes["arrow-button"]} onClick={onClick}>
            <Icon icon="arrow" />
        </button>
    );
};
