import "../styles/index.scss";
import React from "react";
import type { AppProps } from "next/app";
import "dayjs/locale/ru";
import { PageLayout } from "../components/PageLayout";
import { ThemeProvider } from "@emotion/react";
import { theme } from "../common/theme";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useRouter } from "next/router";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

function MyApp({ Component, pageProps }: AppProps) {
    const router = useRouter();
    React.useEffect(() => {
        const handleStart = (url: string) => {
            NProgress.start();
        };

        const handleStop = () => {
            NProgress.done();
        };

        router.events.on("routeChangeStart", handleStart);
        router.events.on("routeChangeComplete", handleStop);
        router.events.on("routeChangeError", handleStop);

        return () => {
            router.events.off("routeChangeStart", handleStart);
            router.events.off("routeChangeComplete", handleStop);
            router.events.off("routeChangeError", handleStop);
        };
    }, [router]);

    return (
        <ThemeProvider theme={theme}>
            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ru">
                <PageLayout>
                    <Component {...pageProps} />
                </PageLayout>
            </LocalizationProvider>
        </ThemeProvider>
    );
}

export default MyApp;
