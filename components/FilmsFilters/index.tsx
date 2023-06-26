import React from 'react';

import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Button from '@mui/material/Button';

import classes from './FilmsFilters.module.scss';
import dayjs, { Dayjs } from 'dayjs';

import { CustomDatePicker } from 'components/customDatePickers/CustomDatePicker';
import { useRouter } from 'next/router';
import { IFilmsFiltersProps } from './FilmsFilters';
import axios, { AxiosResponse } from 'axios';
import { IFilmType } from 'types/filmType.interface';
import { useDidUpdateEffect } from 'hooks/useDidUpdateEffect';
import { IGenre } from 'types/genre.interface';
import CircularProgress from '@mui/material/CircularProgress';
import clsx from 'clsx';
import { ParsedUrlQuery } from 'querystring';
import { getPathAndQuery } from 'common/utils/getPathWithoutQuery';

interface INewQuery extends ParsedUrlQuery {
	date?: string;
	type?: string;
	genre?: string;
}

export const FilmsFilters: React.FC<IFilmsFiltersProps> = ({ category }) => {
	const router = useRouter();
	const { asPath } = router;

	const { path: pathWithoutQuery, query } = getPathAndQuery(asPath);

	const initialDate = query.date ? dayjs(router.query.date as string) : null;
	const [date, setDate] = React.useState<null | Dayjs>(initialDate);

	const initialFilmType = (query.type as IFilmType['alias']) || '';
	const [filmTypes, setFilmTypes] = React.useState<IFilmType[]>([]);
	const [selectedFilmType, setSelectedFilmType] =
		React.useState<IFilmType['alias']>(initialFilmType);

	const [genres, setGenres] = React.useState<IGenre[]>([]);
	const [selectedGenre, setSelectedGenre] = React.useState<IGenre['alias'][]>([]);

	const [isLoadedFilmTypes, setIsLoadedFilmTypes] = React.useState<boolean>(false);

	const [isLoadedGenres, setIsLoadedGenres] = React.useState<boolean>(false);

	const pushWithManageQuery = (queries: INewQuery) => {
		const newQueries: INewQuery = {
			...queries,
		};

		Object.keys(queries).map((key) => {
			if (!newQueries[key]) {
				delete newQueries[key];
			}
		});

		router.push(
			{
				pathname: pathWithoutQuery,
				query: newQueries,
			},
			undefined,
			{ scroll: false },
		);
	};

	React.useEffect(() => {
		(async function () {
			try {
				if (category === 'cinema') {
					setIsLoadedFilmTypes(false);
					const { data: filmTypes } = await axios.get<IFilmType[]>(
						'http://localhost:3444/api/films/types',
					);

					setFilmTypes(filmTypes);
					if (query.type && !filmTypes.find((filmType) => filmType.alias === query.type)) {
						setSelectedFilmType(filmTypes[0].alias);
					}
				}
			} catch (err) {
			} finally {
				setIsLoadedFilmTypes(true);
			}
		})();
	}, [category]);

	React.useEffect(() => {
		(async function () {
			try {
				setIsLoadedGenres(false);

				const { data } = await axios.post<IGenre[]>('http://localhost:3444/api/genres/find', {
					category,
					filmType: selectedFilmType,
					date,
				});

				setGenres(data);

				if (query.genre && typeof query.genre === 'string') {
					const genresFromQuery = query.genre.split(',');
					const genresValues = data.map((genre) => genre.alias);
					if (genresFromQuery.every((g) => genresValues.includes(g as any))) {
						setSelectedGenre(genresFromQuery as IGenre['alias'][]);
					}
				}
			} catch (err) {
			} finally {
				setIsLoadedGenres(true);
			}
		})();
	}, [category, selectedFilmType, date]);

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
		if (query.date !== date?.format('YYYY-MM-DD')) {
			setDate(typeof query.date === 'string' ? dayjs(query.date) : null);
		}
		if (query.type !== selectedFilmType) {
			setSelectedFilmType(
				typeof query.type === 'string' ? (query.type as IFilmType['alias']) : filmTypes[0].alias,
			);
		}
		if (query.genre !== selectedGenre.join(',')) {
			setSelectedGenre(
				typeof query.genre === 'string' ? (query.genre.split(',') as IGenre['alias'][]) : [],
			);
		}
	}, [query.date, query.type, query.genre]);

	const handleChangeDate = (value: Dayjs | null) => {
		if (value) {
			// setDate(value);
			pushWithManageQuery({
				date: value.format('YYYY-MM-DD'),
				type: selectedFilmType,
			});
		}
	};

	const handleChangeFilmType = (e: SelectChangeEvent<IFilmType['alias']>) => {
		const value = e.target.value as IFilmType['alias'];
		// setSelectedFilmType(value);
		pushWithManageQuery({
			type: value,
		});
	};

	const handleChangeGenre = (e: SelectChangeEvent<IGenre['alias'][]>) => {
		// On autofill we get a stringified value.
		const value = typeof e.target.value === 'string' ? e.target.value.split(',') : e.target.value;
		// setSelectedGenre(value as IGenre["alias"][]);
		pushWithManageQuery({
			date: date?.format('YYYY-MM-DD'),
			type: selectedFilmType,
			genre: value.join(','),
		});
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
		<div className={classes['films-filters']}>
			<Grid container spacing={2} justifyContent="center">
				{category === 'cinema' && (
					<Grid item xs={3}>
						<SelectLoaingWrapper loading={!isLoadedFilmTypes}>
							<FormControl sx={{ width: '100%' }} size="small">
								<Select
									MenuProps={{ disableScrollLock: true }}
									value={selectedFilmType}
									onChange={handleChangeFilmType}
									className={classes['films-filters__select']}
									displayEmpty
									inputProps={{
										'aria-label': 'Without label',
									}}
								>
									{filmTypes.map((filmType, index) => (
										<MenuItem key={index} value={filmType.alias}>
											{filmType.name}
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
					<SelectLoaingWrapper loading={!isLoadedGenres}>
						<FormControl sx={{ width: '100%' }} size="small">
							<Select
								value={selectedGenre}
								onChange={handleChangeGenre}
								multiple
								renderValue={(selected) => {
									if (selected.length === 0) {
										return 'жанры';
									}

									if (selected.length === 1) {
										return genres.find((genre) => genre.alias === selected[0])?.name;
									}

									if (selected.length > 1 && selected.length < 5) {
										return `${selected.length} жанра`;
									}

									return `${selected.length} жанров`;
								}}
								MenuProps={{ disableScrollLock: true }}
								className={classes['films-filters__select']}
								displayEmpty
							>
								{genres.map((genre) => (
									<MenuItem key={genre.alias} value={genre.alias}>
										{genre.name}
									</MenuItem>
								))}
							</Select>
						</FormControl>
					</SelectLoaingWrapper>
				</Grid>
				<Grid item xs={3}>
					<Button variant="text" onClick={onReset} className={classes['films-filters__btn']}>
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
			className={clsx(classes['select-loading-wrapper'], {
				[classes['select-loading-wrapper_loading']]: loading,
			})}
		>
			{children}
			{loading && (
				<CircularProgress
					className={classes['select-loading-wrapper__loader']}
					size={20}
					color="secondary"
				/>
			)}
		</div>
	);
};
