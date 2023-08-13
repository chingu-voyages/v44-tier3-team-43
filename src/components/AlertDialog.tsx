"use client";

import { forwardRef } from "react";
import twclsx from "@/utils/twclsx";
import * as AlertDialogPrimitive from "@radix-ui/react-alert-dialog";
import Heading from "@/components/Heading";
import Button from "@/components/Button";

const AlertDialogRoot = AlertDialogPrimitive.Root;

const AlertDialogTrigger = forwardRef<
	React.ElementRef<typeof AlertDialogPrimitive.Trigger>,
	React.ComponentProps<typeof AlertDialogPrimitive.Trigger>
>(({ children, className = "", ...rest }, ref) => (
	<AlertDialogPrimitive.Trigger className={className} ref={ref} {...rest}>
		{children}
	</AlertDialogPrimitive.Trigger>
));

AlertDialogTrigger.displayName = AlertDialogPrimitive.Trigger.displayName;

const AlertDialogOverlay = forwardRef<
	React.ElementRef<typeof AlertDialogPrimitive.Overlay>,
	React.ComponentProps<typeof AlertDialogPrimitive.Overlay>
>(({ children, className, ...rest }, ref) => (
	<AlertDialogPrimitive.Overlay
		className={twclsx(
			"fixed top-0 left-0 w-screen h-screen bg-dark-grey bg-opacity-60 backdrop-blur-sm z-50",
			className
		)}
		ref={ref}
		{...rest}
	>
		{children}
	</AlertDialogPrimitive.Overlay>
));

AlertDialogOverlay.displayName = AlertDialogPrimitive.Overlay.displayName;

const AlertDialogContent = forwardRef<
	React.ElementRef<typeof AlertDialogPrimitive.Content>,
	React.ComponentProps<typeof AlertDialogPrimitive.Content>
>(({ children, className = "", ...rest }, ref) => (
	<AlertDialogPrimitive.Content
		className={twclsx(
			"fixed top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 p-5",
			"bg-custom-black rounded-lg z-50 shadow-md",
			className
		)}
		ref={ref}
		{...rest}
	>
		{children}
	</AlertDialogPrimitive.Content>
));

AlertDialogContent.displayName = AlertDialogPrimitive.AlertDialogContent.displayName;

const AlertDialogTitle = forwardRef<
	React.ElementRef<typeof Heading>,
	React.ComponentProps<typeof Heading>
>(({ children, className = "", ...rest }, ref) => (
	<AlertDialogPrimitive.Title asChild>
		<Heading className={className} size="xl" as="h3" ref={ref} {...rest}>
			{children}
		</Heading>
	</AlertDialogPrimitive.Title>
));

AlertDialogTitle.displayName = AlertDialogPrimitive.Title.displayName;

const AlertDialogDescription = forwardRef<
	React.ElementRef<typeof AlertDialogPrimitive.Description>,
	React.ComponentProps<typeof AlertDialogPrimitive.Description>
>(({ children, className = "", ...rest }, ref) => (
	<AlertDialogPrimitive.Description className={className} ref={ref} {...rest}>
		{children}
	</AlertDialogPrimitive.Description>
));

AlertDialogDescription.displayName = AlertDialogPrimitive.Description.displayName;

const AlertDialogCancel = forwardRef<
	React.ElementRef<typeof Button>,
	React.ComponentProps<typeof Button>
>(({ children, className = "", ...rest }, ref) => (
	<AlertDialogPrimitive.Cancel asChild>
		<Button className={className} variant="secondary" ref={ref} {...rest}>
			{children}
		</Button>
	</AlertDialogPrimitive.Cancel>
));

AlertDialogCancel.displayName = AlertDialogPrimitive.Cancel.displayName;

const AlertDialogAction = forwardRef<
	React.ElementRef<typeof Button>,
	React.ComponentProps<typeof Button>
>(({ children, className = "", ...rest }, ref) => (
	<AlertDialogPrimitive.Action asChild>
		<Button className={className} variant="danger" ref={ref} {...rest}>
			{children}
		</Button>
	</AlertDialogPrimitive.Action>
));

AlertDialogAction.displayName = AlertDialogPrimitive.Action.displayName;

export {
	AlertDialogRoot,
	AlertDialogTrigger,
	AlertDialogOverlay,
	AlertDialogContent,
	AlertDialogTitle,
	AlertDialogDescription,
	AlertDialogCancel,
	AlertDialogAction
};
