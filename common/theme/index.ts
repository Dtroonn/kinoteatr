import { createTheme } from "@mui/material";
import { componentsOverrides } from "./componentsOverrides";

import { palette } from "./palette";
// import { componentsOverrides } from "./componentsOverrides";

export const theme = createTheme({
    palette,
    components: componentsOverrides(palette),
    breakpoints: {
        values: {
            xs: 320,
            sm: 479.98,
            md: 767.98,
            lg: 991.98,
            xl: 1190,
        },
    },
    // components: componentsOverrides(palette),
});
