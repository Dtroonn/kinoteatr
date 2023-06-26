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
import { MODALS_QUERIES } from 'common/constants';

export const CinemaSchedule: React.FC = () => {
	const [isLoaded, setIsLoaded] = React.useState<boolean>(false);
	const [cinemas, setCinemas] = React.useState<ICinema[]>([]);
	const { film } = React.useContext(FilmPageContext);

	const router = useRouter();

	const query = router.query as IScheduleFiltersParsedUrlQuery;

	React.useEffect(() => {
		(async function () {
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

	const handleClickSession = (): void => {
		const { path, query } = getPathAndQuery(router.asPath);
		query[MODALS_QUERIES.BUYING_TICKETS_POPUP] = 'true';

		router.push(
			{
				pathname: path,
				query,
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
									{cinema.filmSessions!.map((session, idx) => (
										<Grid item key={idx}>
											<div onClick={handleClickSession}>
												<SessionInfo
													time={session.date}
													hallNumber={session.hall!.number}
													price={session.price}
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
