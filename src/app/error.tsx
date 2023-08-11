"use client";

import Button, { buttonVariants } from "@/components/Button";
import Heading from "@/components/Heading";
import clsx from "clsx";
import Link from "next/link";
import { useEffect } from "react";

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
	useEffect(() => {
		console.error(error);
	}, [error]);

	return (
		<div className="relative py-7 my-auto flex flex-col items-center text-center overflow-hidden">
			<p className="mb-2 lg:mb-4 lg:text-lg">There was a problem</p>
			<Heading className="break-all" size="3xl" as="h2">
				{process.env.NODE_ENV === "production"
					? "Unexpected server error"
					: error.message}
			</Heading>
			<div className="mt-8 lg:mt-11 flex gap-x-3">
				<Button size="lg" onClick={reset}>
					Try again
				</Button>
				<Link
					className={buttonVariants({
						size: "lg",
						variant: "secondary-outline"
					})}
					href="/"
				>
					Back to Quizify
				</Link>
			</div>
			<p
				className={clsx(
					"absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 -z-10",
					"text-[clamp(7.5rem,3.0929rem+17.6282vw,14.375rem)]",
					"text-dark-grey font-extrabold"
				)}
			>
				OOPS!
			</p>
		</div>
	);
}
