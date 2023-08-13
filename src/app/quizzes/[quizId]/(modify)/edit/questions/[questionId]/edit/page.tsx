import EditQuestionForm from "@/components/EditQuestionForm";
import Heading from "@/components/Heading";
import { getQuestion } from "@/utils/fetchers";
import { Metadata, ResolvingMetadata } from "next";

export const generateMetadata = async (
	{
		params: { quizId, questionId }
	}: { params: { quizId: string; questionId: string } },
	parent: ResolvingMetadata
): Promise<Metadata> => {
	const { openGraph, twitter } = await parent;
	const question = await getQuestion({ quizId, questionId });
	const title = `${question.title} > Edit`;
	const description = "Modify and refine your quiz question for better engagement.";

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

const Page = async ({
	params: { quizId, questionId }
}: {
	params: { quizId: string; questionId: string };
}) => {
	const question = await getQuestion({ quizId, questionId });

	return (
		<>
			<Heading className="mb-8 lg:mb-11" size="5xl">
				Edit Question
			</Heading>
			<EditQuestionForm
				id={question.id}
				title={question.title}
				answers={question.answers}
			/>
		</>
	);
};

export default Page;
