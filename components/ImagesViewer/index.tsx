import React from "react";
import Modal from "@mui/material/Modal";

import classes from "./Gallery.module.scss";
import { ImagesViewerImage } from "./ImagesViewerImage";
import clsx from "clsx";
import { ImagesViewerImageProps } from "./ImagesViewerImage/ImagesViewerImage.props";
import { ImagesViewerProps } from "./ImagesViewer.props";
import { SliderArrow } from "components/SliderArrow";
import { ImagesViewerYoutubeVideo } from "./ImagesViewerVideo";
import { FADE_DURATION } from "./constants";
import { Icon } from "components/Icon";

export const ImagesViewer: React.FC<ImagesViewerProps> = ({
    open,
    startIdx = 0,
    items,
    onClose,
}) => {
    const [currentImageIdx, setCurrentImageIdx] = React.useState(startIdx);
    const timerRef = React.useRef<NodeJS.Timeout | null>(null);
    const touchStartCoordsRef = React.useRef<{ x: number; y: number }>({ x: 0, y: 0 });
    const [fadeAnim, setFadeAnim] = React.useState<ImagesViewerImageProps["fadeAnim"]>("none");

    React.useLayoutEffect(() => {
        setCurrentImageIdx(startIdx);
    }, [startIdx]);

    React.useEffect(() => {
        const handleKeydown = (event: KeyboardEvent) => {
            if (!open) {
                return;
            }

            if (event.code === "ArrowRight") {
                onMoveToSlide(1);
            } else if (event.code === "ArrowLeft") {
                onMoveToSlide(-1);
            } else if (event.code === "Escape") {
                onClose();
            }
        };

        if (open) {
            document.addEventListener("keydown", handleKeydown);
        }

        return () => {
            document.removeEventListener("keydown", handleKeydown);
        };
    }, [open]);

    const onMoveToSlide = (step: number): void => {
        const timer = setTimeout(() => {
            setCurrentImageIdx((prev) => {
                const lastIdx = items.length - 1;
                const idx = prev + step;
                if (idx < 0) {
                    return lastIdx;
                }
                if (idx > lastIdx) {
                    return 0;
                }

                return idx;
            });
            setFadeAnim("none");
        }, FADE_DURATION);

        clearTimeout(timerRef.current as NodeJS.Timeout);
        timerRef.current = timer;
        setFadeAnim("fade-out");
    };

    const handleTouchStart = (event: React.TouchEvent): void => {
        touchStartCoordsRef.current.x = event.changedTouches[0].screenX;
        touchStartCoordsRef.current.y = event.changedTouches[0].screenY;
    };

    const handleTouchEnd = (event: React.TouchEvent): void => {
        if (touchStartCoordsRef.current.x - event.changedTouches[0].screenX > 50) {
            onMoveToSlide(1);
            return;
        }

        if (touchStartCoordsRef.current.x - event.changedTouches[0].screenX < -50) {
            onMoveToSlide(-1);
            return;
        }
    };

    const currentItem = items[currentImageIdx];

    return (
        <Modal
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            open={open}
            onClose={onClose}
            className={classes.dialog}>
            <>
                <button onClick={onClose} className={classes["dialog__close-btn"]}>
                    <Icon icon="cross" />
                </button>
                <SliderArrow
                    size="big"
                    onClick={() => onMoveToSlide(-1)}
                    className={clsx(classes.dialog__btn, classes.dialog__btn_prev)}
                    direction="left"
                />
                <SliderArrow
                    size="big"
                    onClick={() => onMoveToSlide(1)}
                    className={clsx(classes.dialog__btn, classes.dialog__btn_next)}
                    direction="right"
                />
                {(!currentItem.type || currentItem.type === "image") && (
                    <ImagesViewerImage fadeAnim={fadeAnim} src={items[currentImageIdx].src} />
                )}
                {currentItem.type === "youtube-video" && (
                    <ImagesViewerYoutubeVideo
                        fadeAnim={fadeAnim}
                        src={items[currentImageIdx].src}
                    />
                )}
            </>
        </Modal>
    );
};
