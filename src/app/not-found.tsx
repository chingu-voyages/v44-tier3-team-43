import { buttonVariants } from "@/components/Button";
import Heading from "@/components/Heading";
import clsx from "clsx";
import Link from "next/link";

const NotFound = () => (
	<div className="relative py-7 my-auto flex flex-col items-center text-center overflow-hidden">
		<Heading size="5xl" as="h2">
			Page not found
		</Heading>
		<p className="mt-2 lg:mt-4 lg:text-lg">
			The page you were looking for doesn’t seem to exist
		</p>
		<Link
			className={buttonVariants({ size: "lg", className: "mt-8 lg:mt-11" })}
			href="/"
		>
			Back to Quizify
		</Link>
		<p
			className={clsx(
				"absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 -z-10",
				"text-[clamp(7.5rem,3.0929rem+17.6282vw,14.375rem)]",
				"text-dark-grey font-extrabold"
			)}
		>
			404
		</p>
	</div>
);

export default NotFound;
