import React from 'react';
import clsx from 'clsx';

import Typography from '@mui/material/Typography';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { styled } from '@mui/material/styles';

import { IChoosingProductsPopupProps } from './ChoosingProductsPopup.types';
import { Icon } from 'components/Icon';

import classes from './ChoosingProductsPopup.module.scss';
import { BUYING_TICKETS_POPUP_WRAPPER_ID } from 'components/BuyingTicketsPopup/BuyingTicketsPopup.constants';
import { IBarProduct } from 'types/barProduct.interface';
import { inclineOfNum } from 'common/utils/inclineOfNum';

export const ChoosingProductsPopup: React.FC<IChoosingProductsPopupProps> = ({
	productName,
	productId,
	price,
	initialCount,
	groupedProductsByCategory,
	onAdd,
	onClose,
	open,
}) => {
	const [container] = React.useState(() =>
		document.getElementById(BUYING_TICKETS_POPUP_WRAPPER_ID),
	);
	const [count, setCount] = React.useState<number>(initialCount || 1);
	const [selectedProducts, setSelectedProducts] = React.useState<IBarProduct[]>(() =>
		groupedProductsByCategory.map((products) => products[0]),
	);

	React.useEffect(() => {
		setCount(initialCount || 1);
	}, [initialCount]);

	const selectedProductsIds: number[] = selectedProducts.map((p) => p.id);

	const priceForOneProduct = groupedProductsByCategory.length
		? selectedProducts.reduce((sum, p) => sum + p.cinemasProducts[0].price!, 0)
		: price!;

	const totalPrice = priceForOneProduct * count;

	const onChangeSelectedProducts = (product: IBarProduct): void => {
		const newSelectedProducts = selectedProducts.filter(
			(p) => p.categoryAlias !== product.categoryAlias,
		);
		console.log({ newSelectedProducts });
		newSelectedProducts.push(product);
		setSelectedProducts(newSelectedProducts);
	};

	const handleClickAddButton = (): void => {
		onAdd({
			id: productId,
			name: productName,
			price: priceForOneProduct,
			count,
			products: selectedProducts.map((p) => ({
				id: p.id,
				name: p.name,
				price: p.cinemasProducts[0].price as number,
				count: 1,
			})),
		});
		onClose();
	};

	return (
		<StyledDialog
			onClose={onClose}
			open={open}
			container={container}
			classes={{ root: classes.popup, paper: classes.popup__paper }}
		>
			<DialogTitle classes={{ root: classes.popup__title }}>
				{!groupedProductsByCategory.length && 'Выберите количество товара'}
				<IconButton onClick={onClose} className={classes['popup__close-btn']}>
					<Icon icon="cross" />
				</IconButton>
			</DialogTitle>
			{!!groupedProductsByCategory.length && (
				<DialogContent>
					{groupedProductsByCategory.map((products, idx) => {
						const { categoryAlias, category } = products[0];
						return (
							<FormControl key={idx} className={classes.products} fullWidth>
								<FormLabel id={`${categoryAlias}-label`} className={classes.products__category}>
									{category.name}
								</FormLabel>
								<RadioGroup aria-labelledby={`${categoryAlias}-label`} name={categoryAlias}>
									{products.map((product) => (
										<div key={product.id} className={classes.products__option}>
											<FormControlLabel
												onClick={() => onChangeSelectedProducts(product)}
												control={
													<Radio
														checked={selectedProductsIds.includes(product.id)}
														classes={{ root: classes['products__radio-button'] }}
													/>
												}
												label={product.name}
											/>
											<Typography variant="body1" className={classes['products__option-price']}>
												{product.cinemasProducts[0].price}&nbsp;₽
											</Typography>
										</div>
									))}
								</RadioGroup>
							</FormControl>
						);
					})}
				</DialogContent>
			)}
			<div
				className={clsx(classes.popup__footer, {
					[classes.popup__footer_bt]: !!groupedProductsByCategory.length,
				})}
			>
				{!groupedProductsByCategory.length && (
					<Typography variant="h5" className={classes['popup__product-name']}>
						{productName}
					</Typography>
				)}
				<div className={classes['popup__footer-body']}>
					<div>
						<Typography variant="h6" className={classes['popup__footer-title']}>
							{totalPrice}&nbsp;₽ за {count} {inclineOfNum(count, ['товар', 'товара', 'товаров'])}
						</Typography>
						<div className={classes.counter}>
							<button className={classes.counter__btn} onClick={() => setCount((prev) => prev - 1)}>
								<Icon icon="minus" className={classes.counter__icon} />
							</button>
							<Typography variant="body1" color="white" className={classes.counter__text}>
								{count}
							</Typography>
							<button
								color="primary"
								className={classes.counter__btn}
								onClick={() => setCount((prev) => prev + 1)}
							>
								<Icon icon="plus" className={classes.counter__icon} />
							</button>
						</div>
					</div>
					<Button variant="contained" onClick={handleClickAddButton}>
						Добавить
					</Button>
				</div>
			</div>
		</StyledDialog>
	);
};

const StyledDialog = styled(Dialog)({
	position: 'absolute',
	'& .MuiBackdrop-root': {
		position: 'absolute',
	},
});
