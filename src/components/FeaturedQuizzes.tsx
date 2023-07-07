import { searchQuizzes } from "@/utils/fetchers";
import Quizzes from "@/components/Quizzes";
import Link from "next/link";
import { buttonVariants } from "@/components/Button";

const FeaturedQuizzes = async () => {
	const quizzes = await searchQuizzes({ sortBy: "featured", perPage: 10 });

	return (
		<>
			<Quizzes quizzes={quizzes} />
			<Link
				className={buttonVariants({ size: "lg", className: "mt-8" })}
				href={{ pathname: "/search", query: { sortBy: "featured" } }}
			>
				Show more
			</Link>
		</>
	);
};

export default FeaturedQuizzes as unknown as () => JSX.Element;
