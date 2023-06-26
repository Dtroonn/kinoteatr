import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { Tag } from 'components/Tag';
import React from 'react';

import classes from './ScheduleFilters.module.scss';
import { Icon } from 'components/Icon';
import { ScheduleDatePicker } from './ScheduleDatePicker';
import dayjs, { Dayjs } from 'dayjs';
import { IScheduleFiltersProps } from './ScheduleFilters.props';
import clsx from 'clsx';
import axios from 'axios';
import { IFilmFormat, IHallType, ISessionsFiltersRes } from 'pages/api/films/[id]/sessionsFilters';
import { useRouter } from 'next/router';
import { ParsedUrlQuery } from 'querystring';
import { getPathAndQuery } from 'common/utils/getPathWithoutQuery';
import { FilmPageContext } from 'contexts/FilmPage.context';

interface IScheduleFiltersQuery {
	date?: string;
	hallsTypes?: string;
	formats?: string;
	id?: string;
}

export interface IScheduleFiltersParsedUrlQuery extends IScheduleFiltersQuery, ParsedUrlQuery {}

export const ScheduleFilters: React.FC<IScheduleFiltersProps> = ({ className }) => {
	const { film } = React.useContext(FilmPageContext);

	const [formats, setFormats] = React.useState<IFilmFormat[]>([]);
	const [selectedFormats, setSelectedFormats] = React.useState<string[]>([]);

	const [hallsTypes, setHallsTypes] = React.useState<IHallType[]>([]);
	const [selectedHallsTypes, setSelectedHallsTypes] = React.useState<string[]>([]);

	const [date, setDate] = React.useState<Dayjs | null>(dayjs(film.filmSessions[0].date));

	const router = useRouter();
	const { asPath } = router;
	const query = router.query as IScheduleFiltersParsedUrlQuery;

	React.useEffect(() => {
		if (!query.id) return;

		(async function () {
			const { data } = await axios.get<ISessionsFiltersRes>(
				`http://localhost:3000/api/films/${query.id}/sessionsFilters`,
			);
			setFormats(data.formats);
			setHallsTypes(data.hallsTypes);
		})();
	}, [query.id]);

	React.useEffect(() => {
		if (formats.length) {
			setSelectedFormats(typeof query.formats === 'string' ? query.formats.split(',') : []);
		}

		if (hallsTypes.length) {
			setSelectedHallsTypes(
				typeof query.hallsTypes === 'string' ? query.hallsTypes.split(',') : [],
			);
		}

		setDate(typeof query.date === 'string' ? dayjs(query.date) : dayjs(film.filmSessions[0].date));
	}, [query.formats, query.hallsTypes, query.date, formats, hallsTypes]);

	const pushWithManageQuery = (key: keyof IScheduleFiltersQuery, value?: string) => {
		const { path, query } = getPathAndQuery(asPath);
		const newQuery: IScheduleFiltersParsedUrlQuery = {
			...query,
		};

		delete newQuery['id'];

		// if (query.date) {
		// 	newQuery.date = query.date as IScheduleFiltersParsedUrlQuery['date'];
		// }
		// if (query.formats) {
		// 	newQuery.formats = query.formats as IScheduleFiltersParsedUrlQuery['formats'];
		// }
		// if (query.hallsTypes) {
		// 	newQuery.hallsTypes = query.hallsTypes as IScheduleFiltersParsedUrlQuery['hallsTypes'];
		// }

		if (!value) {
			delete newQuery[key];
		} else {
			newQuery[key] = value;
		}
		router.push(
			{
				pathname: path,
				query: newQuery,
			},
			undefined,
			{ scroll: false, shallow: true },
		);
	};

	const handleClickFormatItem = (format: string) => {
		const newSelectedFormats = [...selectedFormats];
		const idx = newSelectedFormats.indexOf(format);

		if (idx === -1) {
			newSelectedFormats.push(format);
		} else {
			newSelectedFormats.splice(idx, 1);
		}

		pushWithManageQuery('formats', newSelectedFormats.join(','));
	};

	const handleChangeHallsTypes = (e: SelectChangeEvent<typeof selectedHallsTypes>) => {
		// On autofill we get a stringified value.
		const value = typeof e.target.value === 'string' ? e.target.value.split(',') : e.target.value;

		pushWithManageQuery('hallsTypes', value.join(','));
	};

	const handleChangeDate = (date: Dayjs | null) => {
		console.log('DATE', date);
		pushWithManageQuery('date', date?.format('YYYY-MM-DD'));
	};

	return (
		<div className={clsx(classes['schedule-filters'], className)}>
			<ScheduleDatePicker
				value={date}
				onChange={handleChangeDate}
				className={classes['schedule-filters__date-picker']}
			/>
			<div style={{ position: 'sticky', top: '124px' }}>
				<Grid container spacing={1}>
					{formats.map((format, idx) => (
						<Grid item key={idx}>
							<Tag
								label={format.title}
								active={selectedFormats.includes(format.slug)}
								onClick={() => handleClickFormatItem(format.slug)}
							/>
						</Grid>
					))}
					<Grid item>
						<FormControl sx={{ width: '100%' }} size="small">
							<Select
								value={selectedHallsTypes}
								onChange={handleChangeHallsTypes}
								multiple
								size="small"
								renderValue={(selected) => {
									if (selected.length === 0) {
										return 'все типы залов';
									}

									if (selected.length === 1) {
										return hallsTypes.find((hallType) => hallType.slug === selected[0])?.title;
									}

									return `несколько`;
								}}
								MenuProps={{ disableScrollLock: true }}
								className={classes['schedule-filters-select']}
								displayEmpty
							>
								{hallsTypes.map((hallType) => (
									<MenuItem
										key={hallType.slug}
										value={hallType.slug}
										className={classes['schedule-filters-select__option']}
									>
										{hallType.title}{' '}
										{selectedHallsTypes.includes(hallType.slug) && <Icon icon="check" />}
									</MenuItem>
								))}
							</Select>
						</FormControl>
					</Grid>
				</Grid>
			</div>
		</div>
	);
};
