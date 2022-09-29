import clsx from "clsx";
import { Icon } from "components/Icon";
import React from "react";
import classes from "./SliderArrow.module.scss";
import { ISliderArrowProps } from "./SliderArrow.props";

export const SliderArrow: React.FC<ISliderArrowProps> = ({
    direction = "right",
    onClick,
    className,
    size = "medium",
}) => {
    return (
        <button
            onClick={onClick}
            className={clsx(
                classes["slider-arrow"],
                classes[`slider-arrow_${direction}`],
                classes[`slider-arrow_${size}`],
                className,
            )}>
            <Icon icon="arrow" className={classes["slider-arrow__icon"]} />
        </button>
    );
};
