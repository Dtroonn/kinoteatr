import React from 'react';

import Dialog from '@mui/material/Dialog';
import { IBuyingTicketsPopupProps } from './BuyingTicketsPopup.props';

import { BuyingTicketsPopupBody } from './BuyingTicketsPopupBody';
import useMediaQuery from '@mui/material/useMediaQuery';
import { theme } from 'common/theme';

import classes from './BuyingTicketsPopup.module.scss';
import { BUYING_TICKETS_POPUP_WRAPPER_ID } from './BuyingTicketsPopup.constants';

export const BuyingTicketsPopup: React.FC<IBuyingTicketsPopupProps> = ({ open, onClose }) => {
	const isDesktop = useMediaQuery<typeof theme>(theme.breakpoints.up('lg'));

	return (
		<Dialog
			scroll="body"
			fullScreen={!isDesktop}
			fullWidth
			maxWidth="lg"
			open={open}
			onClose={onClose}
		>
			<div id={BUYING_TICKETS_POPUP_WRAPPER_ID} className={classes['popup__wrapper']}>
				<BuyingTicketsPopupBody onClose={onClose} />
			</div>
		</Dialog>
	);
};
