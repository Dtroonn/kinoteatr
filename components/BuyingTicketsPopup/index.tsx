import React from 'react';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import { IBuyingTicketsPopupProps } from './BuyingTicketsPopup.props';

import classes from './BuyingTicketsPopup.module.scss';
import { useRouter } from 'next/router';
import { SeatsChoiseStep } from './SeatsChoiseStep';

const STEPS = {
	0: <SeatsChoiseStep />,
};

export const BuyingTicketsPopup: React.FC<IBuyingTicketsPopupProps> = ({ open, onClose }) => {
	// const zoomValueRef = React.useRef<number>(1);
	// const svgHallSizesRef = React.useRef<{
	//     width: number;
	//     height: number;
	// }>({ width: 0, height: 0 });
	// const draggableAreaRef = React.useRef<HTMLDivElement | null>(null);
	// const draggableElemRef = React.useRef<HTMLDivElement | null>(null);
	// const [zoomValue, setZoomValue] = React.useState<number>(1);

	// const onZoom = (value: number) => {
	//     setZoomValue((prev) => prev * value);
	// };

	// const onZoom = (value: "in" | "out") => {
	//     const draggableAreaElem = draggableAreaRef.current as HTMLDivElement;

	//     const svgHallElem = draggableAreaElem.querySelector("svg") as SVGElement;
	//     const groupElem = svgHallElem.querySelector("g") as SVGGElement;
	//     const draggableAreaChild = draggableAreaRef.current!.querySelector(':scope > div') as HTMLDivElement;
	//     const zoomValue = zoomValueRef.current;
	//     if (value === "out") {
	//         if (zoomValue === 0.5) {
	//             return;
	//         }

	//         draggableAreaRef.current!.style.display = 'block'
	//         draggableAreaChild.style.width = `100%`
	//         draggableAreaChild.style.height = `100%`
	//         draggableAreaChild.style.position = ""

	//         const newZoomValue = zoomValue / 2

	//         svgHallElem.style.transform = `scale(${newZoomValue}) ${newZoomValue === 0.5 ? 'translate(-50%, -50%)' : ''}`;

	//         const svgHallWidth = svgHallSizesRef.current.width * newZoomValue;
	//         const svgHallHeight = svgHallSizesRef.current.height * newZoomValue;
	//         draggableElemRef.current!.style.width = `${svgHallWidth}px`
	//         draggableElemRef.current!.style.height = `${svgHallHeight}px`
	//         // svgHallElem.setAttribute("width", String(svgHallWidth));
	//         // svgHallElem.setAttribute("height", String(svgHallHeight));
	//         zoomValueRef.current = newZoomValue;
	//         // svgHallSizesRef.current = {
	//         //     width: svgHallWidth,
	//         //     height: svgHallHeight,
	//         // };
	//         // const groupElemClientRect = groupElem.getBoundingClientRect();
	//         // svgHallElem.setAttribute("width", String(groupElemClientRect.width));
	//         // svgHallElem.setAttribute("height", String(groupElemClientRect.height));
	//     }

	//     if (value === "in") {
	//         if (zoomValue === 2) {
	//             return;
	//         }

	//         const newZoomValue = zoomValue * 2

	//         svgHallElem.style.transform = `scale(${newZoomValue})`;
	//         const svgHallWidth = svgHallSizesRef.current.width * newZoomValue;
	//         const svgHallHeight = svgHallSizesRef.current.height * newZoomValue;
	//         // svgHallElem.setAttribute("width", String(svgHallWidth));
	//         // svgHallElem.setAttribute("height", String(svgHallHeight));
	//         if(newZoomValue === 1) {
	//             draggableElemRef.current!.style.width = `${svgHallWidth}px`
	//             draggableElemRef.current!.style.height = `${svgHallHeight}px`
	//         }

	//         if(newZoomValue === 2) {
	//             draggableAreaRef.current!.style.display = 'flex'
	//             draggableAreaChild.style.width = `${svgHallWidth * 2}px`
	//             draggableAreaChild.style.height = `${svgHallHeight * 2}px`
	//             draggableAreaChild.style.position = "relative"
	//         }

	//         zoomValueRef.current = newZoomValue;
	//         // svgHallSizesRef.current = {
	//         //     width: svgHallWidth,
	//         //     height: svgHallHeight,
	//         // };
	//     }
	// };

	// React.useEffect(() => {
	//     const draggableAreaElem = draggableAreaRef.current;
	//     if (draggableAreaElem) {
	//         const svgHallElem = draggableAreaElem.querySelector("svg") as SVGElement;
	//         const groupElem = svgHallElem.querySelector("g") as SVGGElement;
	//         const svgHallClientRect = svgHallElem.getBoundingClientRect();
	//         svgHallSizesRef.current = {
	//             width: svgHallClientRect.width,
	//             height: svgHallClientRect.height,
	//         };
	//         const transitionValue = "all 0.3s ease 0s";
	//         svgHallElem.style.transition = transitionValue;
	//         groupElem.style.transition = transitionValue;
	//     }
	// }, [draggableAreaRef.current]);

	const [step, setStep] = React.useState<number>(0);

	return (
		<Dialog className={classes.popup} fullWidth maxWidth="lg" open={open} onClose={onClose}>
			<div className={classes['popup__content-wrapper']}>
				{STEPS[step]}
				<DialogActions>
					<Button variant="contained">Купить</Button>
				</DialogActions>
			</div>
		</Dialog>
	);
};
