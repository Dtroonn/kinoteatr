import React from 'react';

import Grid from '@mui/material/Grid';
import { CinemaInfo } from './CinemaInfo';
import { SessionInfo } from './SessionInfo';

import classes from './CinemaSchedule.module.scss';
import { useRouter } from 'next/router';
import { IScheduleFiltersParsedUrlQuery } from '../ScheduleFilters';
import axios from 'axios';
import { getPathAndQuery } from 'common/utils/getPathWithoutQuery';
import { FilmPageContext } from 'contexts/FilmPage.context';
import { ICinema } from 'types/cinema.interface';
import { BUYING_TICKETS_MODAL_QUERIES } from 'common/constants';

export const CinemaSchedule: React.FC = () => {
	const [isLoaded, setIsLoaded] = React.useState<boolean>(false);
	const [cinemas, setCinemas] = React.useState<ICinema[]>([]);
	const { film } = React.useContext(FilmPageContext);

	const router = useRouter();

	const query = router.query as IScheduleFiltersParsedUrlQuery;

	React.useEffect(() => {
		(async function () {
			if (!film.filmSessions.length) {
				return;
			}

			const { data } = await axios.post<ICinema[]>(
				'http://localhost:3444/api/cinemas/findWithSessions',
				{
					filmId: film.id,
					date: query.date ? new Date(query.date) : film.filmSessions[0].date,
					cityAlias: 'voronezh',
					// sessionFormats: query.formats,
					// sessionHallsTypes: query.hallsTypes,
				},
			);

			setCinemas(data);
		})();
	}, [query.id, query.date, query.formats, query.hallsTypes]);

	const onOpenBuyingTicketsPopup = (sessionId: number): void => {
		router.push(
			{
				pathname: router.pathname,
				query: {
					...router.query,
					[BUYING_TICKETS_MODAL_QUERIES.BUYING_TICKETS_POPUP]: 'true',
					[BUYING_TICKETS_MODAL_QUERIES.SESSION_ID]: String(sessionId),
				},
			},
			undefined,
			{
				scroll: false,
				shallow: true,
			},
		);
	};

	return (
		<div>
			<Grid container spacing={6}>
				{cinemas.map((cinema, idx) => (
					<React.Fragment key={idx}>
						<Grid item xs={4}>
							<CinemaInfo
								name={cinema.name}
								address={cinema.address}
								// metroStations={cinema.metroStations}
							/>
						</Grid>
						<Grid item xs={8}>
							<div className={classes.sessions}>
								<Grid container spacing={2}>
									{cinema.filmSessions!.map((session) => (
										<Grid item key={session.id}>
											<div
												className={classes.sessions__item}
												onClick={(): void => onOpenBuyingTicketsPopup(session.id)}
											>
												<SessionInfo
													time={session.date}
													hallNumber={session.hall!.number}
													price={session.tickets![0].price}
													hallType={session.hall!.type}
												/>
											</div>
										</Grid>
									))}
								</Grid>
							</div>
						</Grid>
					</React.Fragment>
				))}
			</Grid>
		</div>
	);
};
