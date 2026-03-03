import React from 'react';
import clsx from 'clsx';

import { BarProductProps } from './BarProduct.props';

import classes from './BarProduct.module.scss';
import Image from 'next/image';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Icon } from 'components/Icon';
import { ChoosingProductsPopup } from '../ChoosingProductsPopup';
import { groupBy } from 'common/utils/groupBy';
import { IBarProduct } from 'types/barProduct.interface';
import { IBarProductOrder } from '../ChoosingProductsPopup/ChoosingProductsPopup.types';
import IconButton from '@mui/material/IconButton';

export const BarProduct: React.FC<BarProductProps> = ({
	imgUrl,
	name,
	id,
	count,
	description,
	price,
	discountPercentage,
	products,
	onAdd,
	onRemove,
}) => {
	const [isOpenDescriptionPopup, setIsOpenDescriptionPopup] = React.useState(false);
	const [isOpenChoosingProductsPopup, setIsOpenChoosingProductsPopup] = React.useState(false);

	const productsWithDiscountPercentage: IBarProduct[] = products.map((product) => {
		const cinemaProduct = product.cinemasProducts[0];
		return {
			...product,
			cinemasProducts: [
				{
					...cinemaProduct,
					price: cinemaProduct.price! - cinemaProduct.price! * (discountPercentage! / 100),
				},
			],
		};
	});

	const groupedProductsByCategory = Object.values(
		groupBy(productsWithDiscountPercentage, 'categoryAlias'),
	);

	const minPrice = groupedProductsByCategory.reduce((price, currentProducts) => {
		const sortedProducts = [...currentProducts].sort(
			(a, b) => a.cinemasProducts[0].price! - b.cinemasProducts[0].price!,
		);
		return price + sortedProducts[0].cinemasProducts[0].price!;
	}, 0);

	const toggleIsOpenDescriptionPopup = (): void => {
		setIsOpenDescriptionPopup((prev) => !prev);
	};

	const onCloseChoosingProductsPopup = (): void => {
		setIsOpenChoosingProductsPopup(false);
	};

	const onOpenChoosingProductsPopup = (): void => {
		setIsOpenChoosingProductsPopup(true);
	};

	const handleAddProduct = (productOrder: IBarProductOrder): void => {
		onAdd(productOrder);
	};

	const handleRemoveProduct = () => {
		onRemove(id);
	};

	return (
		<div className={classes.product}>
			<div
				className={clsx(classes.product__body, {
					[classes.product__body_blur]: isOpenDescriptionPopup,
				})}
			>
				<div className={classes.product__content}>
					<div className={classes['product__image-wrapper']}>
						<Image width={121} height={115} src={imgUrl} alt={name} layout="fixed" />
					</div>
					<div className={classes.product__text}>
						<Typography className={classes.product__title} variant="body1">
							{name}
						</Typography>
						<Typography className={classes.product__description} variant="body2">
							{description}
						</Typography>
					</div>
				</div>
				<div className={classes.product__footer}>
					<Typography className={classes.product__price} variant="body1">
						{groupedProductsByCategory.length ? <>от {minPrice}&nbsp;₽</> : <>{price}&nbsp;₽</>}
					</Typography>
					<div className={classes['footer-actions']}>
						{count && (
							<>
								<IconButton color="error" onClick={handleRemoveProduct}>
									У
								</IconButton>
								<div className={classes['footer-actions__products-count']}>
									<Typography variant="body2">{count}</Typography>
								</div>
							</>
						)}
						<Button onClick={onOpenChoosingProductsPopup} variant="contained">
							{products.length ? 'Выбрать' : 'Добавить'}
						</Button>
					</div>
				</div>
			</div>
			{description && (
				<button
					className={clsx(classes['description-btn'], {
						[classes['description-btn_cross']]: isOpenDescriptionPopup,
					})}
					onClick={toggleIsOpenDescriptionPopup}
				>
					<Icon icon={isOpenDescriptionPopup ? 'cross' : 'info'} />
				</button>
			)}
			<div
				className={clsx(classes['popup-description'], {
					[classes['popup-description_active']]: isOpenDescriptionPopup,
				})}
			>
				<Typography color="white" variant="body1">
					{description}
				</Typography>
			</div>
			<ChoosingProductsPopup
				productId={id}
				initialCount={count}
				onClose={onCloseChoosingProductsPopup}
				open={isOpenChoosingProductsPopup}
				productName={name}
				groupedProductsByCategory={groupedProductsByCategory}
				price={price}
				onAdd={handleAddProduct}
			/>
		</div>
	);
};
