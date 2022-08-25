import { createTheme } from "@mui/material";

import { palette } from "./palette";
// import { componentsOverrides } from "./componentsOverrides";

export const theme = createTheme({
    palette,
    // components: componentsOverrides(palette),
});
