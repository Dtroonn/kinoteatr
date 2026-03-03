import '../styles/index.scss';
import React from 'react';

import dayjs from 'dayjs';
import isToday from 'dayjs/plugin/isToday';
import isTomorrow from 'dayjs/plugin/isTomorrow';
import duration from 'dayjs/plugin/duration';
import updateLocale from 'dayjs/plugin/updateLocale';

import type { AppProps } from 'next/app';
import 'dayjs/locale/ru';
import { PageLayout } from '../components/PageLayout';
import { ThemeProvider } from '@emotion/react';
import { theme } from '../common/theme';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useRouter } from 'next/router';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import { BuyingTicketsPopup } from 'components/BuyingTicketsPopup';
import { BUYING_TICKETS_MODAL_QUERIES } from 'common/constants';
import { getPathAndQuery } from 'common/utils/getPathWithoutQuery';
import { useIsNotSsr } from 'hooks/useIsNotSsr';

dayjs.extend(isToday);
dayjs.extend(isTomorrow);
dayjs.extend(duration);
dayjs.extend(updateLocale);
dayjs.locale('ru');

function MyApp({ Component, pageProps }: AppProps) {
	const router = useRouter();
	const { asPath, query } = router;

	const isNotSsr = useIsNotSsr();

	React.useEffect(() => {
		const handleStart = (url: string) => {
			NProgress.start();
		};

		const handleStop = () => {
			NProgress.done();
		};

		router.events.on('routeChangeStart', handleStart);
		router.events.on('routeChangeComplete', handleStop);
		router.events.on('routeChangeError', handleStop);

		return () => {
			router.events.off('routeChangeStart', handleStart);
			router.events.off('routeChangeComplete', handleStop);
			router.events.off('routeChangeError', handleStop);
		};
	}, [router]);

	const handleCloseBuyingTicketsPopup = (): void => {
		const newQuery = { ...query };
		Object.values(BUYING_TICKETS_MODAL_QUERIES).forEach((value) => {
			delete newQuery[value];
		});

		router.push(
			{
				pathname: router.pathname,
				query: newQuery,
			},
			undefined,
			{
				scroll: false,
				shallow: true,
			},
		);
	};

	return (
		<ThemeProvider theme={theme}>
			<LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ru">
				<PageLayout>
					<Component {...pageProps} />
				</PageLayout>
				{router.isReady && (
					<BuyingTicketsPopup
						open={Boolean(query[BUYING_TICKETS_MODAL_QUERIES.BUYING_TICKETS_POPUP])}
						onClose={handleCloseBuyingTicketsPopup}
					/>
				)}
			</LocalizationProvider>
		</ThemeProvider>
	);
}

export default MyApp;
