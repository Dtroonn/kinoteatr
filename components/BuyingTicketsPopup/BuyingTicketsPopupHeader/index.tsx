import React from 'react';

import { Icon } from 'components/Icon';

import DialogTitle from '@mui/material/DialogTitle';

import classes from './BuyingTicketsPopupHeader.module.scss';
import { BuyingTicketsPopupContext } from '../BuyingTicketsPopup.context';

export const BuyingTicketsPopupHeader: React.FC<{ children?: React.ReactNode }> = ({
	children,
}) => {
	const { onClose, step, onChangeStep } = React.useContext(BuyingTicketsPopupContext);

	return (
		<DialogTitle className={classes.header}>
			{step !== 1 && (
				<button onClick={() => onChangeStep('back')}>
					<Icon className={classes.header__icon} icon="long-arrow" />
				</button>
			)}
			{children}
			<button className={classes['header__cancel-btn']} onClick={onClose}>
				<Icon className={classes.header__icon} icon="cross" />
			</button>
		</DialogTitle>
	);
};
