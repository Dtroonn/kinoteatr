import clsx from "clsx";
import Image, { ImageProps } from "next/image";
import React from "react";

import classes from "./AdaptiveImage.module.scss";
import { IAdaptiveImageProps } from "./AdaptiveImage.props";

export const AdaptiveImage: React.FC<IAdaptiveImageProps> = ({
    className,
    imageClassName,
    children,
    ...props
}) => {
    return (
        <div className={clsx(classes.wrapper, className)}>
            <Image className={imageClassName} layout="fill" {...props} />
            {children}
        </div>
    );
};
