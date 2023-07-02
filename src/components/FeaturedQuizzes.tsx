import Heading from "@/components/Heading";
import { searchQuizzes } from "@/utils/fetchers";
import { buttonVariants } from "@/components/Button";
import Quizzes from "@/components/Quizzes";
import Link from "next/link";

const FeaturedQuizzes = async () => {
	const quizzes = await searchQuizzes({ sortBy: "featured", perPage: 6 });

	return (
		<>
			<Heading className="mt-16 md:mt-20" size="3xl" as="h2">
				Featured Quizzes
			</Heading>
			<Quizzes quizzes={quizzes} />
			<Link
				className={buttonVariants({ size: "lg", className: "mt-8" })}
				href={{ pathname: "search", query: { sortBy: "featured" } }}
			>
				Show more
			</Link>
		</>
	);
};

export default FeaturedQuizzes as unknown as () => JSX.Element;
