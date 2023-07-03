"use client";

import useCategoriesStore from "@/stores/categoriesStore";
import Heading from "@/components/Heading";
import Link from "next/link";
import { buttonVariants } from "@/components/Button";
import ScrollingMenu from "@/components/ScrollingMenu";

const PopularTopics = () => {
	const { categories } = useCategoriesStore();

	return (
		<>
			<Heading size="5xl">Popular Topics</Heading>
			<ScrollingMenu wrapperClassName="mt-6 lg:mt-8">
				{categories
					.sort((a, b) => b._count.quizzes - a._count.quizzes)
					.map((category, index) => (
						<Link
							className={buttonVariants({
								size: "lg",
								variant: "secondary",
								className: "border-none"
							})}
							href={{
								pathname: "/search",
								query: { category: category.name.toLowerCase() }
							}}
							key={`${category}-${index}`}
						>
							{category.name}{" "}
							<span className="text-custom-green">
								&#40;{category._count.quizzes}&#41;
							</span>
						</Link>
					))}
			</ScrollingMenu>
		</>
	);
};

export default PopularTopics;
