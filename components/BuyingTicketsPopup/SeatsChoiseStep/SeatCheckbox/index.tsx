import React from 'react';
import clsx from 'clsx';

import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';

import classes from './SeatCheckbox.module.scss';
import { SeatCheckboxProps } from './SeatCheckbox.props';

export const SeatCheckbox: React.FC<SeatCheckboxProps> = ({
	place,
	price,
	row,
	id,
	color,
	checked,
	disabled,
	isClickable = true,
	onChange,
}) => {
	const isInteractive = isClickable && !disabled;

	const handleChange = () => {
		onChange({
			id,
			place,
			price,
			row,
		});
	};

	return (
		<div className={classes['seat-checkbox']}>
			<Tooltip
				enterTouchDelay={0}
				disableInteractive
				classes={{
					tooltip: classes.tooltip,
					arrow: classes.tooltip__arrow,
				}}
				title={
					isInteractive && (
						<>
							<Typography variant="body2" className={classes['tooltip__title']}>
								Ряд {row} место {place}
							</Typography>
							<div className={classes['tooltip__dot-and-price']}>
								<span className={classes['tooltip__dot']}></span>
								<Typography variant="body1" color="black">
									{price}&nbsp;₽
								</Typography>
							</div>
						</>
					)
				}
				placement="top"
				arrow
			>
				<div
					style={{ background: color }}
					className={clsx(classes['seat-checkbox__item'], {
						[classes['seat-checkbox__item_disabled']]: disabled,
						[classes['seat-checkbox__item_active']]: checked,
					})}
					onClick={handleChange}
					onTouchStart={handleChange}
				>
					{checked && (
						<Typography variant="body1" component="span">
							{place}
						</Typography>
					)}
				</div>
			</Tooltip>

			{isInteractive && (
				<div
					style={{ border: `3px solid ${color}` }}
					className={classes['seat-checkbox__hov']}
				></div>
			)}
		</div>
	);
};
