"use client";

import { forwardRef } from "react";
import twclsx from "@/utils/twclsx";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { IoMdClose } from "react-icons/io";
import Heading from "@/components/Heading";

const DialogRoot = DialogPrimitive.Root;

const DialogTrigger = forwardRef<
	React.ElementRef<typeof DialogPrimitive.Trigger>,
	React.ComponentProps<typeof DialogPrimitive.Trigger>
>(({ children, className = "", ...rest }, ref) => (
	<DialogPrimitive.Trigger
		className={twclsx(
			"transition duration-200 hover:text-custom-green active:opacity-80 group",
			className
		)}
		ref={ref}
		{...rest}
	>
		{children}
	</DialogPrimitive.Trigger>
));

const DialogOverlay = forwardRef<
	React.ElementRef<typeof DialogPrimitive.Overlay>,
	React.ComponentProps<typeof DialogPrimitive.Overlay>
>(({ children, className, ...rest }, ref) => (
	<DialogPrimitive.Overlay
		className={twclsx(
			"fixed top-0 left-0 w-screen h-screen bg-dark-grey bg-opacity-60 backdrop-blur-sm z-50",
			className
		)}
		ref={ref}
		{...rest}
	>
		{children}
	</DialogPrimitive.Overlay>
));

const DialogContent = forwardRef<
	React.ElementRef<typeof DialogPrimitive.Content>,
	React.ComponentProps<typeof DialogPrimitive.Content>
>(({ children, className = "", ...rest }, ref) => (
	<DialogPrimitive.Content
		className={twclsx(
			"fixed top-6 lg:top-9 left-1/2 -translate-x-1/2 max-w-[44rem] w-full px-5 pt-8 pb-14",
			"max-h-full overflow-y-auto bg-custom-black rounded-lg z-50 shadow-md",
			className
		)}
		ref={ref}
		{...rest}
	>
		{children}
	</DialogPrimitive.Content>
));

const DialogTitle = forwardRef<
	React.ElementRef<typeof Heading>,
	React.ComponentProps<typeof Heading>
>(({ children, className = "", ...rest }, ref) => (
	<DialogPrimitive.Title asChild>
		<Heading
			className={twclsx("text-center", className)}
			size="2xl"
			as="h2"
			ref={ref}
			{...rest}
		>
			{children}
		</Heading>
	</DialogPrimitive.Title>
));

const DialogDescription = forwardRef<
	React.ElementRef<typeof DialogPrimitive.Description>,
	React.ComponentProps<typeof DialogPrimitive.Description>
>(({ children, className = "", ...rest }, ref) => (
	<DialogPrimitive.Description className={twclsx("", className)} ref={ref} {...rest}>
		{children}
	</DialogPrimitive.Description>
));

const DialogClose = forwardRef<
	React.ElementRef<typeof DialogPrimitive.Close>,
	React.ComponentProps<typeof DialogPrimitive.Close>
>(({ children, className = "", ...rest }, ref) => (
	<DialogPrimitive.Close
		className={twclsx(
			"absolute right-3 top-3 transition duration-200 hover:opacity-80 active:opacity-60",
			className
		)}
		ref={ref}
		{...rest}
	>
		{children || <IoMdClose className="w-6 h-6" />}
	</DialogPrimitive.Close>
));

export {
	DialogRoot,
	DialogTrigger,
	DialogOverlay,
	DialogContent,
	DialogTitle,
	DialogDescription,
	DialogClose
};
