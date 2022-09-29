import clsx from "clsx";
import React from "react";

import classes from "./ImagesViewerImage.module.scss";
import CircularProgress from "@mui/material/CircularProgress";
import { ImagesViewerImageProps } from "./ImagesViewerImage.props";
import { FADE_DURATION } from "../constants";

export const ImagesViewerImage: React.FC<ImagesViewerImageProps> = ({
    src,
    fadeAnim,
    className,
}) => {
    const imgRef = React.useRef<null | HTMLImageElement>(null);
    const [loadingStatus, setLoadingStatus] = React.useState<"never" | "loading" | "loaded">(
        "never",
    );

    React.useLayoutEffect(() => {
        setLoadingStatus("never");
        let isShowLoader = true;
        setTimeout(() => {
            if (isShowLoader) {
                setLoadingStatus("loading");
            }
        }, 250);

        if (imgRef.current) {
            imgRef.current.onload = function () {
                console.log("HELLO", src);
                isShowLoader = false;
                setLoadingStatus("loaded");
            };
        }

        // setImgSrc(src);
    }, [src]);

    const isLoading = loadingStatus === "loading";
    const isLoaded = loadingStatus === "loaded";

    return (
        <>
            <img
                style={{ transitionDuration: `${FADE_DURATION}ms` }}
                ref={imgRef}
                className={clsx(classes.image, classes[`image_${fadeAnim}`], {
                    [classes["image_fade-in"]]: isLoaded,
                })}
                src={src}
                alt=""
            />
            {isLoading && (
                <CircularProgress className={classes.loader} size={40} color="secondary" />
            )}
        </>
    );
};
