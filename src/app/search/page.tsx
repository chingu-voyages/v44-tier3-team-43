import Hydrate from "@/components/Hydrate";
import QuizSearch from "@/components/QuizSearch";
import { searchQuizzes } from "@/utils/fetchers";
import getQueryClient from "@/utils/getQueryClient";
import { dehydrate } from "@tanstack/query-core";
import { redirect } from "next/navigation";

const Page = async ({
	searchParams: { query, category, sortBy }
}: {
	searchParams: { query?: string; sortBy?: string; category?: string };
}) => {
	const queryClient = getQueryClient();

	if (!(query || sortBy || category)) {
		redirect("/not-found");
	}

	await queryClient.prefetchInfiniteQuery(
		["search-quizzes", query, category, sortBy],
		() =>
			searchQuizzes({
				query,
				category,
				...((sortBy === "featured" || sortBy === "latest") && { sortBy }),
				perPage: 20
			})
	);

	const dehydratedState = dehydrate(queryClient);

	return (
		<>
			<Hydrate state={dehydratedState}>
				<QuizSearch />
			</Hydrate>
		</>
	);
};

export default Page;
