import React from 'react';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { CustomStaticDatePicker } from 'components/customDatePickers/CustomStaticDatePicker';
import { Icon } from 'components/Icon';

import classes from './ScheduleDatePicker.module.scss';
import { IScheduleDatePickerProps } from './ScheduleDatePicker.props';

import isToday from 'dayjs/plugin/isToday';
import isTomorrow from 'dayjs/plugin/isTomorrow';
import dayjs, { Dayjs } from 'dayjs';
import { MONTHS_MAP } from './MonthsMap';

dayjs.extend(isToday);
dayjs.extend(isTomorrow);

export const ScheduleDatePicker: React.FC<IScheduleDatePickerProps> = ({
	onChange,
	value,
	className,
}) => {
	const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

	React.useEffect(() => {
		setAnchorEl(null);
	}, [value]);

	const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const open = Boolean(anchorEl);
	const id = open ? 'simple-popover' : undefined;

	const getTitle = (value: Dayjs | null) => {
		if (value) {
			console.log('VALUE', value);
			if (value.isToday()) {
				return 'сегодня';
			}

			if (value.isTomorrow()) {
				return 'завтра';
			}
			return `${value.date()} ${MONTHS_MAP[value.get('month')]}`;
		}
	};

	console.log('VALUE', value);

	console.log('TITLE', getTitle(value));

	return (
		<div className={className}>
			<button onClick={handleClick} className={classes['header-button']}>
				<Typography variant="h5" color="white" component="span">
					Расписание{' '}
					<Typography variant="h5" color="secondary" component="span">
						{getTitle(value)}
					</Typography>
				</Typography>
				<Icon icon="arrow" className={classes['header-button__icon']} />
			</button>
			<Popover
				id={id}
				open={open}
				anchorEl={anchorEl}
				onClose={handleClose}
				disableScrollLock
				anchorOrigin={{
					vertical: 'bottom',
					horizontal: 'center',
				}}
				transformOrigin={{
					vertical: 'top',
					horizontal: 'center',
				}}
			>
				<CustomStaticDatePicker value={value} onChange={onChange} />
			</Popover>
		</div>
	);
};
