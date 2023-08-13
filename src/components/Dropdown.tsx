"use client";

import { forwardRef } from "react";
import twclsx from "@/utils/twclsx";
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";

const DropdownRoot = DropdownMenuPrimitive.Root;

const DropdownTrigger = forwardRef<
	React.ElementRef<typeof DropdownMenuPrimitive.Trigger>,
	React.ComponentProps<typeof DropdownMenuPrimitive.Trigger>
>(({ children, className = "", ...rest }, ref) => (
	<DropdownMenuPrimitive.Trigger
		className={twclsx(
			"relative transition duration-200 hover:text-custom-green active:opacity-80 group",
			className
		)}
		ref={ref}
		{...rest}
	>
		{children}
	</DropdownMenuPrimitive.Trigger>
));

DropdownTrigger.displayName = DropdownMenuPrimitive.Trigger.displayName;

const DropdownContent = forwardRef<
	React.ElementRef<typeof DropdownMenuPrimitive.Content>,
	React.ComponentProps<typeof DropdownMenuPrimitive.Content>
>(({ children, className = "", ...rest }, ref) => (
	<DropdownMenuPrimitive.Content
		className={twclsx(
			"relative mt-3 px-3 py-4 grid gap-x-2 gap-y-3 bg-dark-grey rounded-lg ring-0",
			"radix-state-open:animate-zoom-in origin-top shadow-md",
			className
		)}
		ref={ref}
		{...rest}
	>
		{children}
	</DropdownMenuPrimitive.Content>
));

DropdownContent.displayName = DropdownMenuPrimitive.Content.displayName;

const DropdownItem = forwardRef<
	React.ElementRef<typeof DropdownMenuPrimitive.Item>,
	React.ComponentProps<typeof DropdownMenuPrimitive.Item>
>(({ children, className = "", ...rest }, ref) => (
	<DropdownMenuPrimitive.Item
		className={twclsx(
			"transition duration-200 hover:text-custom-green text-sm hover:ring-0 active:opacity-80",
			className
		)}
		ref={ref}
		{...rest}
	>
		{children}
	</DropdownMenuPrimitive.Item>
));

DropdownItem.displayName = DropdownMenuPrimitive.Item.displayName;

const DropdownSeparator = forwardRef<
	React.ElementRef<typeof DropdownMenuPrimitive.Separator>,
	React.ComponentProps<typeof DropdownMenuPrimitive.Separator>
>(({ children, className = "", ...rest }, ref) => (
	<DropdownMenuPrimitive.Separator
		className={twclsx("w-full h-[1px] bg-light-grey", className)}
		ref={ref}
		{...rest}
	>
		{children}
	</DropdownMenuPrimitive.Separator>
));

DropdownSeparator.displayName = DropdownMenuPrimitive.Separator.displayName;

const DropdownSub = DropdownMenuPrimitive.Sub;

const DropdownSubTrigger = forwardRef<
	React.ElementRef<typeof DropdownMenuPrimitive.SubTrigger>,
	React.ComponentProps<typeof DropdownMenuPrimitive.SubTrigger>
>(({ children, className = "", ...rest }, ref) => (
	<DropdownMenuPrimitive.SubTrigger
		className={twclsx(
			"relative transition duration-200 hover:text-custom-green active:opacity-80 group",
			className
		)}
		ref={ref}
		{...rest}
	>
		{children}
	</DropdownMenuPrimitive.SubTrigger>
));

DropdownSubTrigger.displayName = DropdownMenuPrimitive.SubTrigger.displayName;

const DropdownSubContent = forwardRef<
	React.ElementRef<typeof DropdownMenuPrimitive.SubContent>,
	React.ComponentProps<typeof DropdownMenuPrimitive.SubContent>
>(({ children, className = "", ...rest }, ref) => (
	<DropdownMenuPrimitive.SubContent
		className={twclsx(
			"relative mt-3 px-3 py-4 grid gap-x-2 gap-y-3 bg-dark-grey rounded-lg ring-0",
			"radix-state-open:animate-zoom-in origin-top shadow-md",
			className
		)}
		ref={ref}
		{...rest}
	>
		{children}
	</DropdownMenuPrimitive.SubContent>
));

DropdownSubContent.displayName = DropdownMenuPrimitive.SubContent.displayName;

export {
	DropdownRoot,
	DropdownTrigger,
	DropdownContent,
	DropdownItem,
	DropdownSeparator,
	DropdownSub,
	DropdownSubTrigger,
	DropdownSubContent
};
