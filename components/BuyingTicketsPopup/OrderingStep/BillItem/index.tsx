import React from 'react';
import Typography from '@mui/material/Typography';

import classes from './BillItem.module.scss';
import clsx from 'clsx';
import { IBillItemProps } from './BillItem.props';

export const BillItem: React.FC<IBillItemProps> = ({ name, value, className }) => {
	return (
		<div className={clsx(classes['bill-item'], className)}>
			<Typography className={classes['bill-item__title']} variant="body2">
				{name}
			</Typography>
			<div className={classes['bill-item__border']}></div>
			<Typography className={classes['bill-item__price']} variant="body2">
				{value}
			</Typography>
		</div>
	);
};
