import { buttonVariants } from "@/components/Button";
import Heading from "@/components/Heading";
import { getQuiz } from "@/utils/fetchers";
import Image from "next/image";
import Link from "next/link";

const Page = async ({ params: { quizId } }: { params: { quizId: string } }) => {
	const quiz = await getQuiz(quizId);

	return (
		<div className="max-w-[36rem] md:max-w-none flex flex-col md:flex-row gap-8">
			<div className="relative max-w-[24rem] w-full md:max-w-none md:w-[40%] aspect-[3/2]">
				<Image
					className="rounded-lg object-cover"
					src={quiz.image}
					alt={quiz.title}
					fill
				/>
			</div>
			<div className="flex-1">
				<Heading size="2xl">{quiz.title}</Heading>
				<div className="mt-6 md:mt-8 flex items-center gap-x-6 lg:text-lg">
					<p>
						Questions:{" "}
						<span className="text-custom-green font-medium">
							{quiz._count.questions}
						</span>
					</p>
					<p>
						Attempts:{" "}
						<span className="text-custom-green font-medium">
							{quiz.attempts}
						</span>
					</p>
				</div>
				<div className="mt-5 md:mt-6 flex items-center gap-x-2">
					<Image
						className="rounded-full"
						width={28}
						height={28}
						src={quiz.User.image}
						alt={quiz.User.name}
					/>
					<p className="text-sm lg:text-base">{quiz.User.name}</p>
				</div>
				<Link
					className={buttonVariants({ className: "mt-8 md:mt-11", size: "lg" })}
					href={`/quizzes/${quiz.id}/play`}
				>
					Play quiz
				</Link>
			</div>
		</div>
	);
};

export default Page;
