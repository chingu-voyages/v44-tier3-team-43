import Heading from "@/components/Heading";
import Questions from "@/components/Questions";
import { getQuestions } from "@/utils/fetchers";
import { Metadata, ResolvingMetadata } from "next";
import Image from "next/image";

export const generateMetadata = async (
	_: any,
	parent: ResolvingMetadata
): Promise<Metadata> => {
	const { openGraph, twitter } = await parent;
	const title = "Play";

	return {
		title,
		openGraph: {
			...openGraph,
			title,
			url: openGraph?.url || undefined
		},
		twitter: {
			...twitter,
			title,
			site: twitter?.site || undefined,
			siteId: twitter?.siteId || undefined,
			creator: twitter?.creator || undefined,
			creatorId: twitter?.creatorId || undefined,
			description: twitter?.description || undefined
		}
	};
};

const Page = async ({ params: { quizId } }: { params: { quizId: string } }) => {
	const questions = await getQuestions(quizId);

	return questions && questions.length ? (
		<Questions questions={questions} quizId={quizId} />
	) : (
		<div className="flex flex-wrap items-center justify-center gap-6">
			<div className="relative max-w-[6rem] sm:max-w-[8rem] w-full aspect-square">
				<Image fill src="/empty-folder.png" alt="empty-folder" />
			</div>
			<Heading size="3xl" as="h3">
				There&apos;s nothing here yet...
			</Heading>
		</div>
	);
};

export default Page;
