import React from 'react';
import { BuyingTicketsPopupHeader } from '../BuyingTicketsPopupHeader';

import DialogContent from '@mui/material/DialogContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Draggable from 'react-draggable';
import { Icon } from 'components/Icon';

import classes from './SeatsChoiseStep.module.scss';
import commonClasses from '../BuyingTicketsPopup.module.scss';

import { SeatCheckbox } from './SeatCheckbox';
import { BuyingTicketsPopupContext, ITicketOrder } from '../BuyingTicketsPopup.context';
import { getDayOfWeek, groupTicketsBySeatRow } from './helpers';
import dayjs from 'dayjs';

import HallScreenSvg from 'public/assets/hallScreen.svg';
import { SessionInfo } from '../components/SessionInfo';
import { inclineOfNum } from 'common/utils/inclineOfNum';
import clsx from 'clsx';
import { ChosenProductsInfo } from '../components/ChosenProductsInfo';

export const SeatsChoiseStep = () => {
	const [zoomValue, setZoomValue] = React.useState<number>(0.5);

	const { filmSession, ticketsOrder, onChangeTicketsOrder, ticketsTotalPrice, onChangeStep } =
		React.useContext(BuyingTicketsPopupContext);

	const ticketsOrderArray = Object.values(ticketsOrder);

	const onZoom = (value: number) => {
		setZoomValue((prev) => {
			const newValue = prev * value;
			if (newValue < 0.5) {
				return prev;
			}

			if (newValue > 2) {
				return prev;
			}

			return newValue;
		});
	};

	const handleChangeSeatCheckbox = (ticket: ITicketOrder) => {
		if (zoomValue === 0.5) {
			onZoom(2);
			return;
		}
		onChangeTicketsOrder(ticket);
	};

	const mappedTickets = groupTicketsBySeatRow(filmSession.tickets);

	const theLongestRow = Object.values(mappedTickets).sort((a, b) => b.length - a.length)[0];

	const rowsNumers = Object.keys(mappedTickets);

	return (
		<>
			<BuyingTicketsPopupHeader>
				<SessionInfo
					filmName={filmSession.film!.name}
					ageRaiting={filmSession.film!.ageRaiting}
					format={filmSession.hall!.type}
					cinemaName={filmSession.cinema!.name}
					hallNumber={filmSession.hall!.number}
					date={filmSession.date}
				/>
			</BuyingTicketsPopupHeader>
			<DialogContent className={commonClasses.popup__content}>
				<div className={classes['zoom-controls']}>
					<button className={classes['zoom-controls__btn']} onClick={() => onZoom(2)}>
						<Icon className={classes['zoom-controls__icon']} icon="plus" />
					</button>
					<button className={classes['zoom-controls__btn']} onClick={() => onZoom(0.5)}>
						<Icon className={classes['zoom-controls__icon']} icon="minus" />
					</button>
				</div>
				<div className={classes['draggable-block']}>
					<Draggable>
						<div className={classes['draggable-block__content']}>
							<div
								style={{
									position: 'absolute',
									transform: `scale(${zoomValue})`,
									transition: 'all 0.3s ease 0s',
									width: 42.5 * theLongestRow.length,
									height: 46 * rowsNumers.length,
								}}
							>
								<img src={HallScreenSvg.src} className={classes['draggable-block__screen-image']} />
								{rowsNumers.map((rowNum) => {
									const positionTop = mappedTickets[rowNum][0].seat.y + 12;
									return (
										<React.Fragment key={rowNum}>
											<Typography
												variant="body2"
												color="white"
												style={{ position: 'absolute', top: positionTop, left: -50 }}
											>
												{rowNum}
											</Typography>
											<Typography
												variant="body2"
												color="white"
												style={{ position: 'absolute', top: positionTop, right: -52 }}
											>
												{rowNum}
											</Typography>
										</React.Fragment>
									);
								})}
								{filmSession.tickets.map(({ price, seat, isAvailable, id }) => (
									<div key={id} style={{ position: 'absolute', left: seat.x, top: seat.y }}>
										<SeatCheckbox
											isClickable={zoomValue !== 0.5}
											checked={!!ticketsOrder[id]}
											color={seat.color}
											place={seat.place}
											price={price}
											id={id}
											disabled={!isAvailable}
											row={seat.row}
											onChange={handleChangeSeatCheckbox}
										/>
									</div>
								))}
							</div>
						</div>
					</Draggable>
				</div>
			</DialogContent>
			<div className={commonClasses.popup__footer}>
				<div className={classes['footer-price-info']}>
					<div className={classes['footer-price-info__circle']}></div>
					<Typography variant="subtitle2" className={classes['footer-price-info__text']}>
						Стандарт {filmSession.tickets[0].price} ₽
					</Typography>
				</div>
				<div className={classes['footer-actions']}>
					<ChosenProductsInfo price={ticketsTotalPrice} ticketsCount={ticketsOrderArray.length} />
					<Button
						size="large"
						variant="contained"
						disabled={!ticketsOrderArray.length}
						onClick={() => onChangeStep('futher')}
					>
						КУПИТЬ
					</Button>
				</div>
			</div>
		</>
	);
};
