"use client";

import useDeleteQuiz from "@/hooks/useDeleteQuiz";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { toast } from "react-toastify";
import Button, { buttonVariants } from "@/components/Button";
import DeletionAlert from "@/components/DeletionAlert";

interface IProps {
	id: string;
	title: string;
	quizImage: string;
}

const MyQuizCard = ({ id, title, quizImage }: IProps) => {
	const { mutateAsync: deleteQuiz } = useDeleteQuiz();

	const handleDelete = async () => {
		try {
			await deleteQuiz(id);
		} catch (err) {
			if (err instanceof Error) {
				toast.error(err.message);
			}

			console.error(err);
		}
	};

	return (
		<div className="flex flex-col md:flex-row bg-dark-grey rounded-lg overflow-hidden select-none">
			<Link
				className="relative w-full pb-[70%] md:w-[45%] md:pb-[36%]"
				href={`/quizzes/${id}`}
				tabIndex={-1}
			>
				<Image
					className="object-cover transition duration-200 hover:opacity-80 active:opacity-60 bg-light-grey"
					fill
					sizes="50vw"
					src={quizImage}
					alt={title}
				/>
			</Link>
			<div className="px-3 py-5 md:w-[55%] md:pl-5 md:pr-6 md:py-8">
				<Link
					className={clsx(
						"text-lg sm:text-xl font-medium line-clamp-3 transition duration-200",
						"hover:opacity-80 active:opacity-60"
					)}
					href={`/quizzes/${id}`}
				>
					{title}
				</Link>
				<div className="mt-6 flex items-center gap-x-2">
					<Link
						className={buttonVariants({
							variant: "modify",
							size: "sm"
						})}
						href={`/quizzes/${id}/edit`}
					>
						Edit
					</Link>
					<DeletionAlert
						Trigger={
							<Button variant="danger" size="sm">
								Delete
							</Button>
						}
						description="Do you really want to delete this quiz? This action cannot be undone."
						onDelete={handleDelete}
					/>
				</div>
			</div>
		</div>
	);
};

export default MyQuizCard;
