import React from 'react';

import { BuyingTicketsPopupHeader } from '../BuyingTicketsPopupHeader';

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import DialogContent from '@mui/material/DialogContent';
import { BuyingTicketsPopupContext, IBarProductOrder } from '../BuyingTicketsPopup.context';
import Button from '@mui/material/Button';

import commonClasses from '../BuyingTicketsPopup.module.scss';

import classes from './BarProductsStep.module.scss';
import { BarProduct } from './BarProduct';
import { ChosenProductsInfo } from '../components/ChosenProductsInfo';

export const BarProductsStep = () => {
	const {
		barProductsCategories,
		barProducts,
		barProductsOrder,
		ticketsOrder,
		totalPrice,
		onAddBarProductOrder,
		onRemoveBarProductOrder,
		onChangeStep,
	} = React.useContext(BuyingTicketsPopupContext);

	const barProductsCount = Object.values(barProductsOrder).reduce(
		(count, product) => count + product.count,
		0,
	);

	const [selectedCategory, setSelectedCategory] = React.useState(barProductsCategories[0].alias);

	const handleChangeTab = (event: React.SyntheticEvent, newValue: string) => {
		setSelectedCategory(newValue);
	};

	const handleAddProduct = (product: IBarProductOrder) => {
		onAddBarProductOrder(product);
	};

	const handleRemoveProduct = (productId: number) => {
		onRemoveBarProductOrder(productId);
	};

	console.log({ barProductsOrder });

	return (
		<>
			<BuyingTicketsPopupHeader>
				<Tabs value={selectedCategory} onChange={handleChangeTab}>
					{barProductsCategories.map((item) => (
						<Tab key={item.id} label={item.name} value={item.alias} />
					))}
				</Tabs>
			</BuyingTicketsPopupHeader>
			<DialogContent className={commonClasses.popup__content}>
				<div className={classes.products}>
					<div className={classes.products__row}>
						{barProducts[selectedCategory].map((product) => (
							<div key={product.id} className={classes.products__item}>
								<BarProduct
									id={product.id}
									count={barProductsOrder[product.id]?.count}
									price={product.cinemasProducts[0].price}
									discountPercentage={product.cinemasProducts[0].discountPercentage}
									products={product.products}
									imgUrl={product.imageUrl}
									name={product.name}
									description={product.description}
									onAdd={handleAddProduct}
									onRemove={handleRemoveProduct}
								/>
							</div>
						))}
					</div>
				</div>
			</DialogContent>
			<div className={commonClasses.popup__footer}>
				<div className={classes['footer-actions']}>
					<ChosenProductsInfo
						barProductsCount={barProductsCount}
						price={totalPrice}
						ticketsCount={Object.values(ticketsOrder).length}
					/>
					<Button size="large" variant="contained" onClick={() => onChangeStep('futher')}>
						ПРОДОЛЖИТЬ
					</Button>
				</div>
			</div>
		</>
	);
};
