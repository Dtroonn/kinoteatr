import purple from "@mui/material/colors/purple";
import { PaletteOptions } from "@mui/material";

export interface ICustomPaletteOptions extends PaletteOptions {
    darkViolet: PaletteOptions["primary"];
    gray: PaletteOptions["primary"];
}

export const palette: ICustomPaletteOptions = {
    primary: {
        main: "#6c43bf",
        dark: "#38178e",
        light: "#9f70f2",
        contrastText: "#fff",
    },
    secondary: {
        main: "#b9a6e0",
        dark: "#8877ae",
        light: "#ecd7ff",
        contrastText: "#fff",
        // "200": purple[200],
    },

    darkViolet: {
        main: "#19072c",
    },

    gray: {
        main: "#85878C",
    },
};
