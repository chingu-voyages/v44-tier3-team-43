"use client";

import twclsx from "@/utils/twclsx";
import Link, { LinkProps } from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { HTMLProps, forwardRef } from "react";

type IProps = Omit<LinkProps, "href"> & Omit<HTMLProps<HTMLAnchorElement>, "ref">;

const NewQuizDialogOpener = forwardRef<HTMLAnchorElement, IProps>(
	({ children, className, ...props }, ref) => {
		const pathname = usePathname();
		const searchParams = useSearchParams();

		const current = new URLSearchParams(Array.from(searchParams.entries()));

		current.set("newQuizOpen", "true");

		const search = current.toString();

		const query = search ? `?${search}` : "";

		return (
			<Link
				className={twclsx(
					"transition duration-200 hover:text-custom-green active:opacity-80",
					className
				)}
				href={pathname + query}
				ref={ref}
				{...props}
			>
				{children}
			</Link>
		);
	}
);

NewQuizDialogOpener.displayName = "NewQuizDialogOpener";

export default NewQuizDialogOpener;
