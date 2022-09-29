import clsx from "clsx";
import React from "react";

import classes from "./ImagesViewerYoutubeVideo.module.scss";
import CircularProgress from "@mui/material/CircularProgress";
import { ImagesViewerYoutubeVideoProps } from "./ImagesViewerYoutubeVideo.props";
import { FADE_DURATION } from "../constants";

export const ImagesViewerYoutubeVideo: React.FC<ImagesViewerYoutubeVideoProps> = ({
    src,
    fadeAnim,
    className,
}) => {
    const iframeRef = React.useRef<null | HTMLIFrameElement>(null);
    const [loadingStatus, setLoadingStatus] = React.useState<"never" | "loading" | "loaded">(
        "never",
    );
    const wrapperRef = React.useRef<HTMLDivElement | null>(null);
    const [wrapperSize, setWrapperSize] = React.useState<{
        width: string;
        height: string;
        paddingBottom: string;
    }>({ width: "100%", height: "", paddingBottom: "" });

    React.useLayoutEffect(() => {
        setLoadingStatus("never");
        let isShowLoader = true;
        setTimeout(() => {
            if (isShowLoader) {
                setLoadingStatus("loading");
            }
        }, 250);

        if (iframeRef.current) {
            iframeRef.current.onload = function () {
                console.log("HELLO Я ЗАГРУЗИЛСЯ", src);
                isShowLoader = false;
                setLoadingStatus("loaded");
            };
        }

        // setImgSrc(src);
    }, [src]);

    React.useLayoutEffect(() => {
        const calcWrapperSize = () => {
            const parentElem = (wrapperRef.current as HTMLDivElement).parentElement as HTMLElement;
            const parentElemStyles = window.getComputedStyle(parentElem);

            const wrapperWidth =
                parentElem.getBoundingClientRect().width -
                parseInt(parentElemStyles.paddingLeft) -
                parseInt(parentElemStyles.paddingRight);

            console.log("WRAPPER WIDTH", wrapperWidth);
            const viewportHeight = window.innerHeight;

            // console.log("window.innerHeight", window.innerHeight);
            // console.log("window.innerWidth", window.innerWidth);
            // console.log("wrapper inner width", wrapperRef.current?.clientWidth);
            // console.log(viewportHeight);
            // console.log(wrapperWidth);
            if (viewportHeight < wrapperWidth) {
                const candidateWidth = viewportHeight * 1.77;
                if (candidateWidth <= wrapperWidth) {
                    setWrapperSize({
                        width: `${candidateWidth.toFixed(2)}px`,
                        height: "100%",
                        paddingBottom: "0",
                    });
                    return;
                }
            }
            setWrapperSize({
                width: "100%",
                height: "0px",
                paddingBottom: "56.25%",
            });
        };
        calcWrapperSize();

        window.addEventListener("resize", calcWrapperSize);

        return () => {
            window.removeEventListener("resize", calcWrapperSize);
        };
    }, []);

    const isLoading = loadingStatus === "loading";
    const isLoaded = loadingStatus === "loaded";
    console.log(wrapperSize);
    return (
        <>
            <div
                className={clsx(classes.wrapper, classes[`wrapper_${fadeAnim}`])}
                ref={wrapperRef}
                style={{
                    width: wrapperSize.width,
                    height: wrapperSize.height,
                    paddingBottom: wrapperSize.paddingBottom,
                    transitionDuration: `${FADE_DURATION}ms`,
                }}>
                <iframe
                    //@ts-ignore
                    ref={iframeRef}
                    className={classes.iframe}
                    src={src}
                    frameBorder="0"
                    allowFullScreen
                />
            </div>
            {isLoading && (
                <CircularProgress className={classes.loader} size={40} color="secondary" />
            )}
        </>
    );
};
