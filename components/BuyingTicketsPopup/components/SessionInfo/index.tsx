import React from 'react';

import classes from './SessionInfo.module.scss';
import Typography from '@mui/material/Typography';
import { getDayOfWeek } from './SessionInfo.helpers';
import { SessionInfoProps } from './SessionInfo.props';
import dayjs from 'dayjs';

export const SessionInfo: React.FC<SessionInfoProps> = ({
	ageRaiting,
	cinemaName,
	date,
	hallNumber,
	filmName,
	format,
	address,
}) => {
	return (
		<div className={classes['session-info']}>
			<div className={classes['session-info__header']}>
				<Typography color="white" variant="h6" className={classes['session-info__name']}>
					{filmName}
				</Typography>
				<div className={classes['session-info__format']}>
					<Typography variant="body2">{ageRaiting}+</Typography>
				</div>
			</div>
			<div className={classes['session-info__format']}>
				<Typography variant="body2">{format || '2D'}</Typography>
			</div>
			<Typography variant="body2" className={classes['session-info__place']}>
				{cinemaName}, Зал {hallNumber}
			</Typography>
			{address && (
				<Typography variant="body2" className={classes['session-info__place']}>
					{address}
				</Typography>
			)}
			<Typography color="white" variant="body1" className={classes['session-info__date']}>
				{getDayOfWeek(date)}, {dayjs(date).format('D MMMM в HH:mm')}
			</Typography>
		</div>
	);
};
