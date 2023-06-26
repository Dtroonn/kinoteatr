import React from 'react';
import { CinemaSchedule } from './CinemaSchedule';
import { ICinemaScreeningScheduleProps } from './CinemaScreeningSchedule.props';
import { ScheduleFilters } from './ScheduleFilters';

import classes from './CinemaScreeningSchedule.module.scss';

export const CinemaScreeningSchedule: React.FC<ICinemaScreeningScheduleProps> = ({ className }) => {
	return (
		<div className={className}>
			<ScheduleFilters className={classes.filters} />
			<CinemaSchedule />
		</div>
	);
};
