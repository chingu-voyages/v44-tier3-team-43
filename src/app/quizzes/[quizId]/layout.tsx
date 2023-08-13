import { getQuiz } from "@/utils/fetchers";
import { openGraph, twitter } from "@/utils/sharedMetadata";
import { Metadata } from "next";

export const generateMetadata = async ({
	params: { quizId }
}: {
	params: { quizId: string };
}): Promise<Metadata> => {
	const quiz = await getQuiz(quizId);

	const title = quiz.title;
	const description = "Test your knowledge with this fun and engaging quiz!";
	const image = quiz.image;

	return {
		title: {
			default: title,
			template: `${title} > %s | Quizipy`
		},
		description,
		openGraph: {
			...openGraph,
			title: {
				default: title,
				template: `${title} > %s | Quizipy`
			},
			description,
			images: {
				url: image,
				width: 1280,
				height: 630
			}
		},
		twitter: {
			...twitter,
			title: {
				default: title,
				template: `${title} > %s | Quizipy`
			},
			description,
			images: [image]
		}
	};
};

const Layout = ({ children }: { children: React.ReactNode }) => <>{children}</>;

export default Layout;
