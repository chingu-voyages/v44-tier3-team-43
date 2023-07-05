"use client";

import twclsx from "@/utils/twclsx";
import {
	ButtonHTMLAttributes,
	DetailedHTMLProps,
	useContext,
	useEffect,
	useState
} from "react";
import { ScrollMenu, Props, VisibilityContext } from "react-horizontal-scrolling-menu";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";

export const Arrow = ({
	className,
	disabled,
	onClick,
	children,
	...rest
}: DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>) => (
	<button
		className={twclsx(
			"absolute top-1/2 -translate-y-1/2 py-4 flex items-center justify-center z-10",
			"bg-custom-black shadow-[0_0_2rem_2rem_#182326] text-custom-white transition",
			"duration-200 hover:text-light-grey disabled:hidden",
			className
		)}
		disabled={disabled}
		onClick={onClick}
		{...rest}
	>
		{children}
	</button>
);

export const LeftArrow = () => {
	const {
		isFirstItemVisible,
		scrollPrev,
		visibleItemsWithoutSeparators,
		initComplete
	} = useContext(VisibilityContext);

	const [disabled, setDisabled] = useState(
		!initComplete || (initComplete && isFirstItemVisible)
	);

	useEffect(() => {
		if (visibleItemsWithoutSeparators.length) {
			setDisabled(isFirstItemVisible);
		}
	}, [isFirstItemVisible, visibleItemsWithoutSeparators]);

	return (
		<Arrow className="left-0" disabled={disabled} onClick={() => scrollPrev()}>
			<BsChevronLeft />
		</Arrow>
	);
};

export const RightArrow = () => {
	const { isLastItemVisible, scrollNext, visibleItemsWithoutSeparators } =
		useContext(VisibilityContext);

	const [disabled, setDisabled] = useState(
		!visibleItemsWithoutSeparators.length && isLastItemVisible
	);

	useEffect(() => {
		if (visibleItemsWithoutSeparators.length) {
			setDisabled(isLastItemVisible);
		}
	}, [isLastItemVisible, visibleItemsWithoutSeparators]);

	return (
		<Arrow className="right-0" disabled={disabled} onClick={() => scrollNext()}>
			<BsChevronRight />
		</Arrow>
	);
};

const ScrollingMenu = ({
	children,
	wrapperClassName,
	scrollContainerClassName,
	...rest
}: Props) => (
	<ScrollMenu
		wrapperClassName={twclsx(
			"relative overflow-hidden justify-center",
			wrapperClassName
		)}
		scrollContainerClassName={twclsx(
			"flex items-center gap-x-1 lg:gap-x-2 overflow-scroll no-scrollbar",
			scrollContainerClassName
		)}
		LeftArrow={LeftArrow}
		RightArrow={RightArrow}
		options={{ threshold: [0.01, 0.01, 0.02, 0.03, 0.04, 1] }}
		{...rest}
	>
		{children}
	</ScrollMenu>
);

export default ScrollingMenu;
