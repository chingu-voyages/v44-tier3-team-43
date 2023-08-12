"use client";

import Heading from "@/components/Heading";
import Link from "next/link";
import { buttonVariants } from "@/components/Button";
import ScrollingMenu from "@/components/ScrollingMenu";
import useCategories from "@/hooks/useCategories";
import ButtonSkeleton from "@/components/ButtonSkeleton";

const PopularTopics = () => {
	const { data: categories, status } = useCategories();

	return (
		<>
			<Heading size="5xl">Popular Topics</Heading>
			<ScrollingMenu wrapperClassName="mt-6 lg:mt-8">
				{status === "success" ? (
					[...categories]
						.sort((a, b) => b._count.quizzes - a._count.quizzes)
						.map((category, index) => (
							<Link
								className={buttonVariants({
									size: "lg",
									variant: "secondary"
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
						))
				) : status === "loading" ? (
					Array.from(Array(20), (_, i) => (
						<ButtonSkeleton variant="secondary" size="lg" key={i} />
					))
				) : (
					<></>
				)}
			</ScrollingMenu>
		</>
	);
};

export default PopularTopics;
