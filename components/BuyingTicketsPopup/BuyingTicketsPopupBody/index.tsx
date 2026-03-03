import React from 'react';
import axios from 'axios';

import { SeatsChoiseStep } from '../SeatsChoiseStep';

import commonClasses from '../BuyingTicketsPopup.module.scss';

import {
	API_GET_BAR_PRODUCTS,
	API_GET_BAR_PRODUCTS_CATEGORIES,
	API_GET_FILM_SESSION_BY_ID,
} from 'common/api';
import { BUYING_TICKETS_MODAL_QUERIES } from 'common/constants';
import { useRouter } from 'next/router';
import { IFilmSession } from 'types/filmSession.interface';
import {
	BuyingTicketsPopupContextProvider,
	IBuyingTicketsPopupContext,
} from '../BuyingTicketsPopup.context';
import CircularProgress from '@mui/material/CircularProgress';
import { IBarProductCategory } from 'types/barProductCategory.interface';
import { BarProductsStep } from '../BarProductsStep';
import { IBarProduct } from 'types/barProduct.interface';
import { groupBy } from 'common/utils/groupBy';
import { OrderingStep } from '../OrderingStep';

const STEPS: Record<number, React.ReactNode> = {
	1: <SeatsChoiseStep />,
	2: <BarProductsStep />,
	3: <OrderingStep />,
};

export const BuyingTicketsPopupBody: React.FC<{ onClose: () => void }> = ({ onClose }) => {
	const [step, setStep] = React.useState<number>(1);
	const [filmSession, setFilmSession] = React.useState<IFilmSession | null>(null);
	const [barProductsCategories, setBarProductsCategories] = React.useState<IBarProductCategory[]>(
		[],
	);
	const [barProducts, setBarProducts] = React.useState<Record<string, IBarProduct[]>>([]);
	const [isLoaded, setIsLoaded] = React.useState<boolean>(false);

	const router = useRouter();

	const { query, asPath } = router;

	console.log('QUERY', { query, asPath });

	const onChangeStep: IBuyingTicketsPopupContext['onChangeStep'] = (value) => {
		if (value === 'futher' && step !== Object.keys(STEPS).length) {
			setStep(step + 1);
		}

		if (value === 'back' && step !== 1) {
			setStep(step - 1);
		}
	};

	React.useEffect(() => {
		(async function () {
			const [filmSessionRes, barProductsCategoriesRes, barProductsRes] = await Promise.all([
				axios.get<IFilmSession>(
					API_GET_FILM_SESSION_BY_ID(query[BUYING_TICKETS_MODAL_QUERIES.SESSION_ID] as string),
				),
				axios.get<IBarProductCategory[]>(API_GET_BAR_PRODUCTS_CATEGORIES),
				axios.get<IBarProduct[]>(API_GET_BAR_PRODUCTS),
			]);

			setFilmSession(filmSessionRes.data);
			setBarProductsCategories(barProductsCategoriesRes.data);
			setBarProducts(groupBy(barProductsRes.data, 'categoryAlias'));
			setIsLoaded(true);
		})();
	}, []);

	if (!isLoaded) {
		return <CircularProgress size={60} className={commonClasses.popup__loader} />;
	}

	return (
		<BuyingTicketsPopupContextProvider
			filmSession={filmSession as IFilmSession}
			barProductsCategories={barProductsCategories}
			barProducts={barProducts}
			onChangeStep={onChangeStep}
			onClose={onClose}
			step={step}
		>
			{STEPS[step]}
		</BuyingTicketsPopupContextProvider>
	);
};
