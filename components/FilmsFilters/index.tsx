import React from "react";

import Grid from "@mui/material/Grid";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Button from "@mui/material/Button";

import classes from "./FilmsFilters.module.scss";
import dayjs, { Dayjs } from "dayjs";

import { CustomDatePicker } from "components/CustomDatePicker";
import { useRouter } from "next/router";
import { IFilmsFiltersProps } from "./FilmsFilters";
import axios, { AxiosResponse } from "axios";
import { IFilmType } from "pages/api/films/types";
import { useDidUpdateEffect } from "hooks/useDidUpdateEffect";
import { IFilmGenre } from "pages/api/films/genres";
import CircularProgress from "@mui/material/CircularProgress";
import clsx from "clsx";
import { ParsedUrlQuery } from "querystring";

interface INewQuery extends ParsedUrlQuery {
    date?: string;
    type?: string;
    genre?: string;
}

interface IUiFilmType extends Omit<IFilmType, "slug"> {
    slug: IFilmType["slug"] | "default";
}

const defaultFilmType: IUiFilmType = {
    id: -1,
    title: "В продаже",
    slug: "default",
};

export const FilmsFilters: React.FC<IFilmsFiltersProps> = ({ category }) => {
    const router = useRouter();
    const { query, asPath } = router;

    const initialDate = query.date ? dayjs(new Date(router.query.date as string)) : null;
    const [date, setDate] = React.useState<null | Dayjs>(initialDate);

    const initialFilmType = (query.type as IUiFilmType["slug"]) || "default";
    const [filmTypes, setFilmTypes] = React.useState<IUiFilmType[]>([defaultFilmType]);
    const [selectedFilmType, setSelectedFilmType] =
        React.useState<IUiFilmType["slug"]>(initialFilmType);

    const [genres, setGenres] = React.useState<IFilmGenre[]>([]);
    const [selectedGenre, setSelectedGenre] = React.useState<IFilmGenre["slug"][]>([]);

    const [isLoadedGenresAndFilmTypes, setIsLoadedGenresAndFilmTypes] =
        React.useState<boolean>(false);

    const pathWithoutQuery = asPath.split("?")[0];

    const pushWithManageQuery = (key: keyof INewQuery, value?: string) => {
        const newQuery: INewQuery = {};

        if (query.date) {
            newQuery.date = query.date as INewQuery["date"];
        }
        if (query.type) {
            newQuery.type = query.type as INewQuery["type"];
        }
        if (query.genre) {
            newQuery.genre = query.genre as INewQuery["genre"];
        }

        if (!value) {
            delete newQuery[key];
        } else {
            newQuery[key] = value;
        }
        router.push(
            {
                pathname: pathWithoutQuery,
                query: newQuery,
            },
            undefined,
            { scroll: false },
        );
    };

    React.useEffect(() => {
        (async function () {
            try {
                const genresReq = axios.get<IFilmGenre[]>(
                    "http://localhost:3000/api/films/genres",
                    {
                        params: {
                            category,
                        },
                    },
                );

                let filmTypesReq;
                if (category === "cinema") {
                    filmTypesReq = axios.get<IFilmType[]>("http://localhost:3000/api/films/types", {
                        params: {
                            category,
                        },
                    });
                }

                const [genresRes, filmTypesRes] = await Promise.all([genresReq, filmTypesReq]);

                setGenres(genresRes.data);
                if (query.genre && typeof query.genre === "string") {
                    const genresFromQuery = query.genre.split(",");
                    const genresValues = genresRes.data.map((genre) => genre.slug);
                    if (genresFromQuery.every((g) => genresValues.includes(g as any))) {
                        setSelectedGenre(genresFromQuery as IFilmGenre["slug"][]);
                    }
                }

                if (category === "cinema") {
                    const filmTypes = (filmTypesRes as AxiosResponse<IFilmType[]>).data;
                    setFilmTypes([defaultFilmType, ...filmTypes]);
                    if (query.type && !filmTypes.find((filmType) => filmType.slug === query.type)) {
                        setSelectedFilmType("default");
                    }
                }
            } catch (err) {
            } finally {
                setIsLoadedGenresAndFilmTypes(true);
            }
        })();
    }, [category]);

    // useDidUpdateEffect(() => {
    //     const query: { date?: string; type?: string; genre?: string } = {};
    //     if (date) {
    //         query.date = date.format("YYYY-MM-DD");
    //     }
    //     if (selectedFilmType) {
    //         query.type = selectedFilmType;
    //     }
    //     if (selectedGenre.length > 0) {
    //         query.genre = selectedGenre.join(",");
    //     }
    //     router.push(
    //         {
    //             pathname: pathWithoutQuery,
    //             query: query,
    //         },
    //         undefined,
    //         { scroll: false },
    //     );
    // }, [date, selectedFilmType, selectedGenre, pathWithoutQuery]);

    useDidUpdateEffect(() => {
        if (query.date !== date?.format("YYYY-MM-DD")) {
            setDate(typeof query.date === "string" ? dayjs(new Date(query.date)) : null);
        }
        if (query.type !== selectedFilmType) {
            setSelectedFilmType(
                typeof query.type === "string"
                    ? (query.type as IUiFilmType["slug"])
                    : defaultFilmType.slug,
            );
        }
        if (query.genre !== selectedGenre.join(",")) {
            setSelectedGenre(
                typeof query.genre === "string"
                    ? (query.genre.split(",") as IFilmGenre["slug"][])
                    : [],
            );
        }
    }, [query.date, query.type, query.genre]);

    const handleChangeDate = (value: Dayjs | null) => {
        if (value) {
            setDate(value);
            pushWithManageQuery("date", value.format("YYYY-MM-DD"));
        }
    };

    const handleChangeFilmType = (e: SelectChangeEvent<IUiFilmType["slug"]>) => {
        const value = e.target.value as IUiFilmType["slug"];
        setSelectedFilmType(value);
        pushWithManageQuery("type", value);
    };

    const handleChangeGenre = (e: SelectChangeEvent<IFilmGenre["slug"][]>) => {
        // On autofill we get a stringified value.
        const value =
            typeof e.target.value === "string" ? e.target.value.split(",") : e.target.value;
        setSelectedGenre(value as IFilmGenre["slug"][]);
        pushWithManageQuery("genre", value.join(","));
    };

    const onReset = () => {
        router.push(
            {
                pathname: pathWithoutQuery,
            },
            undefined,
            { scroll: false },
        );
    };

    return (
        <div className={classes["films-filters"]}>
            <Grid container spacing={2} justifyContent="center">
                {category === "cinema" && (
                    <Grid item xs={3}>
                        <SelectLoaingWrapper loading={!isLoadedGenresAndFilmTypes}>
                            <FormControl sx={{ width: "100%" }} size="small">
                                <Select
                                    MenuProps={{ disableScrollLock: true }}
                                    value={selectedFilmType}
                                    onChange={handleChangeFilmType}
                                    className={classes["films-filters__select"]}
                                    displayEmpty
                                    inputProps={{
                                        "aria-label": "Without label",
                                    }}>
                                    {filmTypes.map((filmType, index) => (
                                        <MenuItem key={index} value={filmType.slug}>
                                            {filmType.title}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </SelectLoaingWrapper>
                    </Grid>
                )}
                <Grid item xs={3}>
                    <CustomDatePicker onChange={handleChangeDate} value={date} />
                </Grid>
                <Grid item xs={3}>
                    <SelectLoaingWrapper loading={!isLoadedGenresAndFilmTypes}>
                        <FormControl sx={{ width: "100%" }} size="small">
                            <Select
                                value={selectedGenre}
                                onChange={handleChangeGenre}
                                multiple
                                renderValue={(selected) => {
                                    if (selected.length === 0) {
                                        return "жанры";
                                    }

                                    if (selected.length === 1) {
                                        return genres.find((genre) => genre.slug === selected[0])
                                            ?.title;
                                    }

                                    if (selected.length > 1 && selected.length < 5) {
                                        return `${selected.length} жанра`;
                                    }

                                    return `${selected.length} жанров`;
                                }}
                                MenuProps={{ disableScrollLock: true }}
                                className={classes["films-filters__select"]}
                                displayEmpty>
                                {genres.map((genre) => (
                                    <MenuItem key={genre.slug} value={genre.slug}>
                                        {genre.title}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </SelectLoaingWrapper>
                </Grid>
                <Grid item xs={3}>
                    <Button
                        variant="text"
                        onClick={onReset}
                        className={classes["films-filters__btn"]}>
                        Сбросить фильтр
                    </Button>
                </Grid>
            </Grid>
        </div>
    );
};

const SelectLoaingWrapper: React.FC<{ loading: boolean; children: React.ReactNode }> = ({
    loading,
    children,
}) => {
    return (
        <div
            className={clsx(classes["select-loading-wrapper"], {
                [classes["select-loading-wrapper_loading"]]: loading,
            })}>
            {children}
            {loading && (
                <CircularProgress
                    className={classes["select-loading-wrapper__loader"]}
                    size={20}
                    color="secondary"
                />
            )}
        </div>
    );
};
