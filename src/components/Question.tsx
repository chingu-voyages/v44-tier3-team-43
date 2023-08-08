"use client";

import { IQuestion } from "@/types/api";
import Link from "next/link";
import Button, { buttonVariants } from "@/components/Button";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import useDeleteQuestion from "@/hooks/useDeleteQuestion";
import { toast } from "react-toastify";

type Props = Pick<IQuestion, "id" | "quizId" | "title">

const Question = ({ id, quizId, title }: Props) => {
	const pathname = usePathname();
	const { mutateAsync: deleteQuestion } = useDeleteQuestion();

	const handleDelete = async () => {
		try {
			await deleteQuestion({ quizId, questionId: id });
		} catch (err) {
			if (err instanceof Error) {
				toast.error(err.message);
			}

			console.error(err);
		}
	};

	return (
		<div
			className={clsx(
				"py-3 sm:py-4 flex flex-col sm:flex-row sm:justify-between sm:items-center",
				"gap-y-2 gap-x-4 border-t first:border-none first:pt-0 border-dark-grey"
			)}
		>
			<p className="lg:text-lg">{title}</p>
			<div className="flex items-center gap-x-2">
				<Link
					className={buttonVariants({
						className: "bg-custom-orange focus-visible:ring-custom-orange"
					})}
					href={`${pathname}/${id}/edit`}
				>
					Edit
				</Link>
				<Button
					className="bg-custom-red focus-visible:ring-custom-red"
					onClick={handleDelete}
				>
					Delete
				</Button>
			</div>
		</div>
	);
};

export default Question;
