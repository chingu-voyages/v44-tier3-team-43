import Heading from "@/components/Heading";
import Quizzes from "@/components/Quizzes";
import { searchQuizzes } from "@/utils/fetchers";

const Page = async ({
	searchParams: { query, category, sortBy }
}: {
	searchParams: { query?: string; sortBy?: string; category?: string };
}) => {
	const quizzes = await searchQuizzes({
		...(query && { query }),
		...((sortBy === "featured" || sortBy === "latest") && { sortBy }),
		...(category && { category })
	});

	return (
		<>
			<Heading size="5xl">Results</Heading>
			{quizzes && quizzes.length ? (
				<Quizzes quizzes={quizzes} />
			) : (
				<p className="mt-11">We couldn't find anything \'_'/</p>
			)}
		</>
	);
};

export default Page;
