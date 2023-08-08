"use client";

import useQuestions from "@/hooks/useQuestions";
import { useParams, usePathname } from "next/navigation";
import Question from "@/components/Question";
import Link from "next/link";
import { buttonVariants } from "@/components/Button";
import Image from "next/image";
import Heading from "@/components/Heading";
import QuestionSkeleton from "@/components/QuestionSkeleton";
import { BiErrorCircle } from "react-icons/bi";

const ManageQuestions = () => {
	const pathname = usePathname();
	const { quizId } = useParams();
	const { data: questions, status } = useQuestions(quizId);

	return (
		<>
			<div className="max-w-[56rem] w-full">
				{status === "loading" && (
					<>
						<div className="max-w-[5rem] w-full h-7 mb-6 rounded-md bg-light-grey"></div>
						<div>
							{Array.from(Array(10), (_, i) => (
								<QuestionSkeleton key={i} />
							))}
						</div>
					</>
				)}
				{status === "success" && (
					<>
						{questions && questions.length ? (
							<>
								<p className="mb-6 text-lg lg:text-xl">
									Total:{" "}
									<span className="text-custom-green font-medium">
										{questions.length}
									</span>
								</p>
								<div>
									{questions.map((question) => (
										<Question
											id={question.id}
											quizId={question.quizId}
											title={question.title}
											key={question.id}
										/>
									))}
								</div>
							</>
						) : (
							<div className="flex flex-wrap items-center gap-4">
								<div className="relative max-w-[3rem] sm:max-w-[5rem] w-full aspect-square">
									<Image
										fill
										src="/empty-folder.png"
										alt="empty-folder"
									/>
								</div>
								<Heading size="2xl" as="h3">
									There's nothing here yet...
								</Heading>
							</div>
						)}
						<Link
							className={buttonVariants({ className: "mt-6", size: "lg" })}
							href={`${pathname}/add`}
						>
							Add question
						</Link>
					</>
				)}
				{status === "error" && (
					<div className="flex flex-wrap items-center gap-4">
						<BiErrorCircle className="w-16 h-16 sm:w-20 sm:h-20 text-custom-red" />
						<div>
							<Heading size="2xl" as="h3">
								Something went wrong...
							</Heading>
							<p className="mt-2 lg:text-lg">Please try again later</p>
						</div>
					</div>
				)}
			</div>
		</>
	);
};

export default ManageQuestions;
