import React from "react";
import Dialog from "@mui/material/Dialog";
import { SwiperSlide, Swiper } from "swiper/react";
import SwiperClass from "swiper/types/swiper-class";
import { Navigation, EffectFade, Thumbs, Lazy } from "swiper";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import Image from "next/image";

import classes from "./FilmSlider.module.scss";
import { AdaptiveImage } from "components/AdaptiveImage";
import { SliderArrow } from "components/SliderArrow";
import clsx from "clsx";
import { BREAKPOINTS } from "common/constants";
//@ts-ignore
import PhotoSwipeLightbox from "photoswipe/lightbox";
import "photoswipe/style.css";
import { ImagesViewer } from "components/ImagesViewer";
import { useIsNotSsr } from "hooks/useIsNotSsr";
import { Typography } from "@mui/material";

const mainSliderItems: { imageUrl: string; youtubeUrl?: string }[] = [
    {
        imageUrl: "https://s3.kinoteatr.ru/preview9/upload/m1/00/00/00/00/8876401.jpg",
        youtubeUrl: "https://www.youtube.com/embed/J7QqeS35RTI",
    },
    {
        imageUrl: "https://s1.kinoteatr.ru/preview9/upload/m1/00/00/00/00/887630.jpg",
    },
    {
        imageUrl: "https://s2.kinoteatr.ru/preview9/upload/m1/00/00/00/00/860499.jpg",
    },
    {
        imageUrl: "https://swiperjs.com/demos/images/nature-4.jpg",
    },
    {
        imageUrl: "https://swiperjs.com/demos/images/nature-5.jpg",
    },
    {
        imageUrl: "https://swiperjs.com/demos/images/nature-6.jpg",
    },
    {
        imageUrl: "https://swiperjs.com/demos/images/nature-7.jpg",
    },
    {
        imageUrl: "https://swiperjs.com/demos/images/nature-8.jpg",
    },
    {
        imageUrl: "https://swiperjs.com/demos/images/nature-9.jpg",
    },
    {
        imageUrl: "https://swiperjs.com/demos/images/nature-10.jpg",
    },
];

const navigationSliderItems: { imageUrl: string }[] = [
    {
        imageUrl: "https://s3.kinoteatr.ru/preview19/upload/m1/00/00/00/00/8876401.jpg",
    },
    {
        imageUrl: "https://s1.kinoteatr.ru/preview19/upload/m1/00/00/00/00/887630.jpg",
    },
    {
        imageUrl: "https://s2.kinoteatr.ru/preview19/upload/m1/00/00/00/00/860499.jpg",
    },
    {
        imageUrl: "https://swiperjs.com/demos/images/nature-4.jpg",
    },
    {
        imageUrl: "https://swiperjs.com/demos/images/nature-5.jpg",
    },
    {
        imageUrl: "https://swiperjs.com/demos/images/nature-6.jpg",
    },
    {
        imageUrl: "https://swiperjs.com/demos/images/nature-7.jpg",
    },
    {
        imageUrl: "https://swiperjs.com/demos/images/nature-8.jpg",
    },
    {
        imageUrl: "https://swiperjs.com/demos/images/nature-9.jpg",
    },
    {
        imageUrl: "https://swiperjs.com/demos/images/nature-10.jpg",
    },
];

export const FilmSlider = () => {
    const [thumbsSwiper, setThumbsSwiper] = React.useState<null | SwiperClass>(null);
    const [viewImageIdx, setViewImageIdx] = React.useState<number | undefined>();
    const isNotSsr = useIsNotSsr();

    const handleCloseImagesViewer = () => {
        setViewImageIdx(undefined);
    };

    const mainSliderItemsLength = mainSliderItems.length;
    return (
        <div className={classes.wrapper}>
            {isNotSsr && (
                <ImagesViewer
                    items={mainSliderItems.map((item) => {
                        if (item.youtubeUrl) {
                            return {
                                src: item.youtubeUrl,
                                type: "youtube-video",
                            };
                        }

                        return {
                            src: item.imageUrl.replace("preview9/", ""),
                            type: "image",
                        };
                    })}
                    startIdx={viewImageIdx}
                    open={viewImageIdx !== undefined}
                    onClose={handleCloseImagesViewer}
                />
            )}
            <div className={classes["main-slider"]}>
                <Swiper
                    //@ts-ignore
                    onSwiper={setThumbsSwiper}
                    effect={"fade"}
                    simulateTouch={false}
                    spaceBetween={10}
                    watchSlidesProgress={true}
                    modules={[Thumbs, EffectFade, Lazy]}
                    loop
                    lazy
                    loopAdditionalSlides={4}
                    className={classes["main-slider__slider"]}>
                    {mainSliderItems.map((item, idx) => (
                        <SwiperSlide
                            onClick={() => setViewImageIdx(idx)}
                            key={idx}
                            className={classes["main-slider__slide"]}>
                            {({ isDuplicate }) => {
                                return (
                                    <AdaptiveImage
                                        className={classes["main-slider__image"]}
                                        alt=""
                                        src={item.imageUrl}>
                                        <div className={classes["main-slider__counter"]}>
                                            <Typography color="white" variant="body2">{`${
                                                idx + 1
                                            }/${mainSliderItemsLength}`}</Typography>
                                        </div>
                                    </AdaptiveImage>
                                );
                            }}
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
            <div className={classes["navigation-slider"]}>
                <Swiper
                    thumbs={{
                        swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
                    }}
                    className={classes["navigation-slider__slider"]}
                    slideToClickedSlide
                    navigation={{
                        nextEl: `.${classes["navigation-slider__arrow_next"]}`,
                        prevEl: `.${classes["navigation-slider__arrow_prev"]}`,
                    }}
                    slidesPerView="auto"
                    modules={[Navigation, Thumbs]}
                    loop
                    loopAdditionalSlides={4}
                    breakpoints={{
                        [BREAKPOINTS.lg]: {
                            slidesPerView: 3,
                            spaceBetween: 2,
                        },
                        [BREAKPOINTS.md]: {
                            slidesPerView: 5,
                            spaceBetween: 2,
                        },
                        640: {
                            slidesPerView: 4,
                            spaceBetween: 6,
                        },
                        [BREAKPOINTS.xs]: {
                            slidesPerView: 3,
                            spaceBetween: 2,
                        },
                    }}>
                    {navigationSliderItems.map((item, idx) => (
                        <SwiperSlide key={idx} className={classes["navigation-slider__slide"]}>
                            <AdaptiveImage
                                className={classes["navigation-slider__image"]}
                                alt=""
                                src={item.imageUrl}
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>
                <div className={classes["navigation-slider__navigation"]}>
                    <SliderArrow
                        direction="left"
                        className={clsx(
                            classes["navigation-slider__arrow"],
                            classes["navigation-slider__arrow_prev"],
                        )}
                    />
                    <SliderArrow
                        className={clsx(
                            classes["navigation-slider__arrow"],
                            classes["navigation-slider__arrow_next"],
                        )}
                    />
                </div>
            </div>
        </div>
    );
};
