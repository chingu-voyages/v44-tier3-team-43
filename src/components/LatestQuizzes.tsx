import { searchQuizzes } from "@/utils/fetchers";
import Quizzes from "@/components/Quizzes";
import Link from "next/link";
import { buttonVariants } from "@/components/Button";

const LatestQuizzes = async () => {
	const quizzes = await searchQuizzes({ sortBy: "latest", perPage: 10 });

	return (
		<>
			<Quizzes quizzes={quizzes} />
			<Link
				className={buttonVariants({ size: "lg", className: "mt-8" })}
				href={{ pathname: "/search", query: { sortBy: "latest" } }}
			>
				Show more
			</Link>
		</>
	);
};

export default LatestQuizzes as unknown as () => JSX.Element;
