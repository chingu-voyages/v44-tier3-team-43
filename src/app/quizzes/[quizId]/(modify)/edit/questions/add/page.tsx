import Heading from "@/components/Heading";
import NewQuestionForm from "@/components/NewQuestionForm";
import { Metadata, ResolvingMetadata } from "next";

export const generateMetadata = async (
	_: any,
	parent: ResolvingMetadata
): Promise<Metadata> => {
	const { openGraph, twitter } = await parent;
	const title = "Add Question";
	const description = "Enhance your quiz by adding a new question to it!";

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

const Page = () => (
	<>
		<Heading className="mb-8 lg:mb-11" size="5xl">
			New Question
		</Heading>
		<NewQuestionForm />
	</>
);

export default Page;
