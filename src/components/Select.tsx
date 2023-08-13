"use client";

import { forwardRef } from "react";
import twclsx from "@/utils/twclsx";
import * as SelectPrimitive from "@radix-ui/react-select";
import { BsChevronDown, BsChevronUp } from "react-icons/bs";
import clsx from "clsx";
import Button from "@/components/Button";

const SelectRoot = SelectPrimitive.Root;

const SelectTrigger = forwardRef<
	React.ElementRef<typeof Button>,
	React.ComponentProps<typeof Button>
>(({ children, className = "", ...rest }, ref) => (
	<SelectPrimitive.Trigger asChild>
		<Button
			className={twclsx(
				"justify-between radix-state-open:rounded-b-none group",
				className
			)}
			variant="secondary"
			ref={ref}
			{...rest}
		>
			{children}
		</Button>
	</SelectPrimitive.Trigger>
));

SelectTrigger.displayName = SelectPrimitive.Trigger.displayName;

const SelectValue = forwardRef<
	React.ElementRef<typeof SelectPrimitive.Value>,
	React.ComponentProps<typeof SelectPrimitive.Value>
>(({ children, ...rest }, ref) => (
	<SelectPrimitive.Value ref={ref} {...rest}>
		{children}
	</SelectPrimitive.Value>
));

SelectValue.displayName = SelectPrimitive.Value.displayName;

const SelectIcon = forwardRef<
	React.ElementRef<typeof SelectPrimitive.Icon>,
	React.ComponentProps<typeof SelectPrimitive.Icon>
>(({ children, className = "", ...rest }, ref) => (
	<SelectPrimitive.Icon
		className={twclsx("text-light-grey", className)}
		ref={ref}
		{...rest}
	>
		{children || (
			<BsChevronDown
				className={clsx(
					"w-4 h-4 text-light-grey transition duration-200",
					"group-radix-state-open:rotate-180 group-radix-state-open:opacity-60"
				)}
			/>
		)}
	</SelectPrimitive.Icon>
));

SelectIcon.displayName = SelectPrimitive.Icon.displayName;

const SelectContent = forwardRef<
	React.ElementRef<typeof SelectPrimitive.Content>,
	React.ComponentProps<typeof SelectPrimitive.Content>
>(({ children, className = "", ...rest }, ref) => (
	<SelectPrimitive.Content
		className={twclsx(
			"py-2 w-radix-select-trigger-width bg-dark-grey z-50 rounded-b-xl ring-0 overflow-hidden",
			"radix-state-open:animate-slide-down origin-top shadow-md",
			className
		)}
		position="popper"
		avoidCollisions={false}
		ref={ref}
		{...rest}
	>
		{children}
	</SelectPrimitive.Content>
));

SelectContent.displayName = SelectPrimitive.Content.displayName;

const SelectViewport = forwardRef<
	React.ElementRef<typeof SelectPrimitive.Viewport>,
	React.ComponentProps<typeof SelectPrimitive.Viewport>
>(({ children, className = "", ...rest }, ref) => (
	<SelectPrimitive.Viewport
		className={twclsx("max-h-60 overflow-y-scroll", className)}
		ref={ref}
		{...rest}
	>
		{children}
	</SelectPrimitive.Viewport>
));

SelectViewport.displayName = SelectPrimitive.Viewport.displayName;

const SelectItem = forwardRef<
	React.ElementRef<typeof SelectPrimitive.Item>,
	React.ComponentProps<typeof SelectPrimitive.Item>
>(({ children, className = "", ...rest }, ref) => (
	<SelectPrimitive.Item
		className={twclsx(
			"px-2.5 py-1.5 lg:px-3 lg:py-2 text-sm lg:text-base select-none transition duration-200",
			"radix-state-checked:bg-custom-green bg-opacity-80 hover:bg-custom-green hover:bg-opacity-40",
			"active:bg-opacity-60 focus-visible:bg-custom-green focus-visible:bg-opacity-40",
			"radix-disabled:pointer-events-none radix-disabled:radix-state-checked:bg-transparent radix-disabled:opacity-60",
			className
		)}
		ref={ref}
		{...rest}
	>
		{children}
	</SelectPrimitive.Item>
));

SelectItem.displayName = SelectPrimitive.Item.displayName;

const SelectItemText = forwardRef<
	React.ElementRef<typeof SelectPrimitive.ItemText>,
	React.ComponentProps<typeof SelectPrimitive.ItemText>
>(({ children, className = "", ...rest }, ref) => (
	<SelectPrimitive.ItemText className={className} ref={ref} {...rest}>
		{children}
	</SelectPrimitive.ItemText>
));

SelectItemText.displayName = SelectPrimitive.ItemText.displayName;

const SelectScrollUpButton = forwardRef<
	React.ElementRef<typeof SelectPrimitive.ScrollUpButton>,
	React.ComponentProps<typeof SelectPrimitive.ScrollUpButton>
>(({ children, className = "", ...rest }, ref) => (
	<SelectPrimitive.ScrollUpButton
		className={twclsx(
			"mx-auto py-1 transition duration-200 hover:opacity-80",
			className
		)}
		ref={ref}
		{...rest}
	>
		{children || <BsChevronUp className="w-3 h-3" />}
	</SelectPrimitive.ScrollUpButton>
));

SelectScrollUpButton.displayName = SelectPrimitive.ScrollUpButton.displayName;

const SelectScrollDownButton = forwardRef<
	React.ElementRef<typeof SelectPrimitive.ScrollDownButton>,
	React.ComponentProps<typeof SelectPrimitive.ScrollDownButton>
>(({ children, className = "", ...rest }, ref) => (
	<SelectPrimitive.ScrollDownButton
		className={twclsx(
			"mx-auto py-1 transition duration-200 hover:opacity:80",
			className
		)}
		ref={ref}
		{...rest}
	>
		{children || <BsChevronDown className="w-3 h-3" />}
	</SelectPrimitive.ScrollDownButton>
));

SelectScrollDownButton.displayName = SelectPrimitive.ScrollDownButton.displayName;

export {
	SelectRoot,
	SelectTrigger,
	SelectValue,
	SelectIcon,
	SelectContent,
	SelectViewport,
	SelectItem,
	SelectItemText,
	SelectScrollUpButton,
	SelectScrollDownButton
};
