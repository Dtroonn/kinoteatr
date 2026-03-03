import React from 'react';
import { ChosenProductsInfoProps } from './ChosenProductsInfo.props';
import Typography from '@mui/material/Typography';
import { inclineOfNum } from 'common/utils/inclineOfNum';
import clsx from 'clsx';
import classes from './ChosenProductsInfo.module.scss';

export const ChosenProductsInfo: React.FC<ChosenProductsInfoProps> = ({
	ticketsCount,
	barProductsCount,
	price,
}) => {
	return (
		<div className={classes.wrapper}>
			{!!ticketsCount && (
				<Typography variant="subtitle2" color="primary" fontWeight={600}>
					{ticketsCount} {inclineOfNum(ticketsCount, ['билет', 'билета', 'билетов'])}
					{!!barProductsCount &&
						` и ${barProductsCount} ${inclineOfNum(barProductsCount, [
							'товар',
							'товара',
							'товаров',
						])}`}
				</Typography>
			)}
			<Typography
				variant="subtitle2"
				className={clsx(classes['text'], {
					[classes['text_w']]: !!ticketsCount,
				})}
			>
				{ticketsCount ? <>за {price}&nbsp;₽</> : 'Выберите места'}
			</Typography>
		</div>
	);
};
