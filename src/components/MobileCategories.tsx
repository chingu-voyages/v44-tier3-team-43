"use client";

import Link from "next/link";
import { DropdownItem, DropdownSubContent } from "./Dropdown";
import useCategories from "@/hooks/useCategories";
import Spinner from "./Spinner";
import clsx from "clsx";

const MobileMenuCategories = () => {
	const { data: categories, status } = useCategories();

	return (
		<DropdownSubContent
			className={clsx(
				status === "success" ? "grid-cols-2 gap-x-4" : "justify-center"
			)}
			alignOffset={-60}
		>
			{status === "loading" && <Spinner />}
			{status === "success" &&
				categories.map((category, index) => (
					<DropdownItem asChild key={`${category}-${index}`}>
						<Link
							className="block"
							href={{
								pathname: "/search",
								query: {
									category: category.name.toLowerCase()
								}
							}}
						>
							{category.name}
						</Link>
					</DropdownItem>
				))}
		</DropdownSubContent>
	);
};

export default MobileMenuCategories;
