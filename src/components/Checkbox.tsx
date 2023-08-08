"use client";

import { forwardRef } from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import twclsx from "@/utils/twclsx";
import { BsCheckLg } from "react-icons/bs";

const CheckboxRoot = forwardRef<
	React.ElementRef<typeof CheckboxPrimitive.Root>,
	React.ComponentProps<typeof CheckboxPrimitive.Root>
>(({ children, className = "", ...rest }, ref) => (
	<CheckboxPrimitive.Root
		className={twclsx(
			"w-4 h-4 flex justify-center items-center rounded-sm border border-custom-white",
			"cursor-default",
			className
		)}
		ref={ref}
		{...rest}
	>
		{children}
	</CheckboxPrimitive.Root>
));

const CheckboxIndicator = forwardRef<
	React.ElementRef<typeof CheckboxPrimitive.Indicator>,
	React.ComponentProps<typeof CheckboxPrimitive.Indicator>
>(({ children, className = "", ...rest }, ref) => (
	<CheckboxPrimitive.Indicator className={className} ref={ref} {...rest}>
		{children || <BsCheckLg />}
	</CheckboxPrimitive.Indicator>
));

export { CheckboxRoot, CheckboxIndicator };
