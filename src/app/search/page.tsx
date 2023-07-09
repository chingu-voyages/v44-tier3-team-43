import Heading from "@/components/Heading";
import QuizSearch from "@/components/QuizSearch";
import QuizSearchFilters from "@/components/QuizSearchFilters";
import { redirect } from "next/navigation";

const Page = ({
	searchParams: { query, category, sortBy }
}: {
	searchParams: { query?: string; sortBy?: string; category?: string };
}) => {
	if (!(query || sortBy || category)) {
		redirect("/not-found");
	}

	return (
		<>
			<Heading size="5xl">Results</Heading>
			<QuizSearchFilters />
			<QuizSearch />
		</>
	);
};

export default Page;
