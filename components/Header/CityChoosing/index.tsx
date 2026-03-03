import React from 'react';

import Typography from '@mui/material/Typography';

import classes from './CityChoosing.module.scss';
import clsx from 'clsx';

const cities: string[] = new Array(20).fill('Москва');

export const CityChoosing: React.FC = () => {
	const [openDropdown, setOpenDropdown] = React.useState<boolean>(false);

	const toggleOpenDropdown = (): void => {
		setOpenDropdown((prev) => !prev);
	};

	return (
		<div className={classes['city-choosing']}>
			<button className={classes['city-choosing__btn']} onClick={toggleOpenDropdown}>
				<Typography color="primary" variant="body1">
					Воронеж
				</Typography>
			</button>
			<div
				className={clsx(classes['city-choosing__dropdown'], {
					[classes['city-choosing__dropdown_open']]: openDropdown,
				})}
			>
				<div className="_container">
					<ul className={classes['city-choosing__list']}>
						{cities.map((city, idx) => (
							<li key={idx}>
								<Typography color="primary" variant="body1">
									{city}
								</Typography>
							</li>
						))}
					</ul>
				</div>
			</div>
		</div>
	);
};
