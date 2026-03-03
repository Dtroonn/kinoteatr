import React from 'react';

import Typography from '@mui/material/Typography';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';

import DialogContent from '@mui/material/DialogContent';
import Button from '@mui/material/Button';

import { BuyingTicketsPopupHeader } from '../BuyingTicketsPopupHeader';

import commonClasses from '../BuyingTicketsPopup.module.scss';
import classes from './OrderingStep.module.scss';
import { BuyingTicketsPopupContext } from '../BuyingTicketsPopup.context';
import { SessionInfo } from '../components/SessionInfo';
import { NumericFormatProps, PatternFormat } from 'react-number-format';
import { inclineOfNum } from 'common/utils/inclineOfNum';
import clsx from 'clsx';
import { BillItem } from './BillItem';
import { emailRegexp } from 'common/regexps';

export const OrderingStep: React.FC = () => {
	const {
		filmSession,
		ticketsOrder,
		barProductsOrder,
		totalPrice,
		email,
		phone,
		onChangeEmail,
		onChangePhone,
		onChangeStep,
	} = React.useContext(BuyingTicketsPopupContext);

	const emailErrMessage = emailRegexp.test(email)
		? ''
		: 'Пожалуйста, укажите существующий адрес электронной почты';
	const phoneErrMessage =
		phone.length === 10 ? '' : 'Пожалуйста, укажите существующий номер телефона';
	const isDisabledSubmitBtn = !!(emailErrMessage || phoneErrMessage);

	const ticketsOrderArr = Object.values(ticketsOrder);
	const barProductsArr = Object.values(barProductsOrder);

	const handleChangeInput: React.ChangeEventHandler<HTMLInputElement> = (event) => {
		const { name, value } = event.target;
		if (name === 'email') {
			onChangeEmail(value);
		} else if (name === 'phone') {
			console.log({ value });
			onChangePhone(value);
		}
	};

	return (
		<>
			<BuyingTicketsPopupHeader />
			<DialogContent className={commonClasses.popup__content}>
				<div className={classes.body}>
					<div className={classes.body__column}>
						<div className={classes['left-content']}>
							<div className={classes['left-content__session-info-wrapper']}>
								<SessionInfo
									filmName={filmSession.film!.name}
									ageRaiting={filmSession.film!.ageRaiting}
									format={filmSession.hall!.type}
									cinemaName={filmSession.cinema!.name}
									hallNumber={filmSession.hall!.number}
									address={filmSession.cinema!.address}
									date={filmSession.date}
								/>
							</div>
							<div className={classes.bill}>
								<Typography className={classes.bill__title} variant="body1">
									{ticketsOrderArr.length}{' '}
									{inclineOfNum(ticketsOrderArr.length, ['билет', 'билета', 'билетов'])}
								</Typography>
								<div className={classes.bill__body}>
									<div className={classes.bill__items}>
										{ticketsOrderArr.map((ticket) => (
											<BillItem
												className={classes.bill__item}
												key={ticket.id}
												name={`Ряд ${ticket.row}, Место ${ticket.place}`}
												value={`${ticket.price} ₽`}
											/>
										))}
									</div>
									{!!barProductsArr.length && (
										<div className={clsx(classes.bill__items, classes.bill__items_mt)}>
											{barProductsArr.map((product) => (
												<BillItem
													className={classes.bill__item}
													key={product.id}
													name={product.name}
													value={`${product.count} x ${product.price} ₽`}
												/>
											))}
										</div>
									)}
								</div>
								<div className={classes['bill__total-block']}>
									<Typography color="white" className={classes['bill__total-text']} variant="body2">
										Итого: {totalPrice}&nbsp;₽
									</Typography>
								</div>
							</div>
						</div>
					</div>
					<div className={classes.body__column}>
						<Typography className={classes.form__title} variant="body1">
							Данные для получения заказа
						</Typography>
						<TextField
							fullWidth
							name="email"
							placeholder="Введите E-mail"
							onChange={handleChangeInput}
							error={!!emailErrMessage}
							helperText={emailErrMessage}
							value={email}
							InputProps={{
								className: classes.form__input,
								endAdornment: (
									<InputAdornment position="end">
										<h3>la</h3>
									</InputAdornment>
								),
							}}
							variant="outlined"
							margin="dense"
						/>
						<TextField
							fullWidth
							name="phone"
							value={phone}
							error={!!phoneErrMessage}
							helperText={phoneErrMessage}
							placeholder="Введите телефон"
							onChange={handleChangeInput}
							InputProps={{
								className: classes.form__input,
								endAdornment: (
									<InputAdornment position="end">
										<h3>la</h3>
									</InputAdornment>
								),
								inputComponent: PatternFormatPhone as any,
							}}
							margin="dense"
							variant="outlined"
						/>
					</div>
				</div>
			</DialogContent>
			<div className={commonClasses.popup__footer}>
				<div className={classes['footer-actions']}>
					<Button
						size="large"
						variant="contained"
						onClick={() => onChangeStep('futher')}
						disabled={isDisabledSubmitBtn}
					>
						Забронировать {totalPrice}&nbsp;₽
					</Button>
				</div>
			</div>
		</>
	);
};

interface CustomProps {
	onChange: (event: { target: { name: string; value: string } }) => void;
	name: string;
}

const PatternFormatPhone = React.forwardRef<NumericFormatProps, CustomProps>(
	function NumericFormatCustom(props, ref) {
		const { onChange, ...other } = props;

		return (
			<PatternFormat
				{...other}
				getInputRef={ref}
				onValueChange={(values) => {
					onChange({
						target: {
							name: props.name,
							value: values.value,
						},
					});
				}}
				format="+7 (###) ### ## ##"
			/>
		);
	},
);
