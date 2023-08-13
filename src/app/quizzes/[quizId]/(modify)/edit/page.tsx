import EditQuizForm from "@/components/EditQuizForm";
import Heading from "@/components/Heading";
import { getQuiz } from "@/utils/fetchers";
import { Metadata, ResolvingMetadata } from "next";

export const generateMetadata = async (
	_: any,
	parent: ResolvingMetadata
): Promise<Metadata> => {
	const { openGraph, twitter } = await parent;
	const title = "Edit";
	const description = "Customize and edit your quiz to make it even better!";

	return {
		title,
		description,
		openGraph: {
			...openGraph,
			title,
			description,
			url: openGraph?.url || undefined
		},
		twitter: {
			...twitter,
			title,
			site: twitter?.site || undefined,
			siteId: twitter?.siteId || undefined,
			creator: twitter?.creator || undefined,
			creatorId: twitter?.creatorId || undefined,
			description
		}
	};
};

const Page = async ({ params: { quizId } }: { params: { quizId: string } }) => {
	const quiz = await getQuiz(quizId);

	return (
		<>
			<Heading className="mb-8 lg:mb-11" size="5xl">
				Edit Quiz
			</Heading>
			<EditQuizForm
				id={quiz.id}
				title={quiz.title}
				category={quiz.category}
				image={quiz.image}
			/>
		</>
	);
};

export default Page;
