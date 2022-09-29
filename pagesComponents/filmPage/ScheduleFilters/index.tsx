import Grid from "@mui/material/Grid";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { Tag } from "components/Tag";
import React from "react";

import classes from "./ScheduleFilters.module.scss";

const FORMATS: { title: string; value: string }[] = [
    {
        title: "2D",
        value: "2d",
    },
    {
        title: "Пушкинская карта",
        value: "pushkin_card",
    },
];

export const ScheduleFilters = () => {
    const [selectedFormats, setSelectedFormats] = React.useState<string[]>([]);

    const handleClickFormatItem = (format: string) => {
        const idx = selectedFormats.indexOf(format);
        if (idx === -1) {
            setSelectedFormats((prev) => [...prev, format]);
            return;
        }

        setSelectedFormats((prev) => {
            const formats = [...prev];
            formats.splice(idx, 1);
            return formats;
        });
    };

    return (
        <div>
            <Grid container spacing={1}>
                {FORMATS.map((format, idx) => (
                    <Grid item key={idx}>
                        <Tag
                            label={format.title}
                            active={selectedFormats.includes(format.value)}
                            onClick={() => handleClickFormatItem(format.value)}
                        />
                    </Grid>
                ))}
                <Grid item>
                    <FormControl sx={{ width: "100%" }} size="small">
                        <Select
                            value={[]}
                            // onChange={handleChangeGenre}
                            multiple
                            size="small"
                            renderValue={(selected) => {
                                return "все типы залов";
                                // if (selected.length === 0) {
                                //     return "все типы залов";
                                // }

                                // if (selected.length === 1) {
                                //     return genres.find((genre) => genre.slug === selected[0])
                                //         ?.title;
                                // }

                                // if (selected.length > 1 && selected.length < 5) {
                                //     return `${selected.length} жанра`;
                                // }

                                // return `${selected.length} жанров`;
                            }}
                            MenuProps={{ disableScrollLock: true }}
                            className={classes["films-filters__select"]}
                            displayEmpty>
                            {[
                                { title: "Прайм", slug: "prime" },
                                { title: "Комфорт", slug: "komfort" },
                            ].map((genre) => (
                                <MenuItem key={genre.slug} value={genre.slug}>
                                    {genre.title}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
            </Grid>
        </div>
    );
};
