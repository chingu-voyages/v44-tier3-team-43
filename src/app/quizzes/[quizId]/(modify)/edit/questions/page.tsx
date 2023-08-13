import Heading from "@/components/Heading";
import ManageQuestions from "@/components/ManageQuestions";
import { Metadata, ResolvingMetadata } from "next";

export const generateMetadata = async (
	_: any,
	parent: ResolvingMetadata
): Promise<Metadata> => {
	const { openGraph, twitter } = await parent;
	const title = "Questions";
	const description = "Effortlessly manage and organize questions for your quiz.";

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
			Questions
		</Heading>
		<ManageQuestions />
	</>
);

export default Page;
