"use client";

import { IQuestion } from "@/types/api";
import { updateQuestionSchema } from "@/utils/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams, useRouter } from "next/navigation";
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";
import InputField from "@/components/InputField";
import AnswerField from "@/components/AnswerField";
import Button from "@/components/Button";
import FormError from "@/components/FormError";
import clsx from "clsx";
import useUpdateQuestion from "@/hooks/useUpdateQuestion";
import useDeleteQuestion from "@/hooks/useDeleteQuestion";

type Props = Pick<IQuestion, "id" | "title" | "answers">;

type FormFields = z.infer<typeof updateQuestionSchema>;

const EditQuestionForm = ({ id, title, answers }: Props) => {
	const router = useRouter();
	const { quizId } = useParams();
	const { mutateAsync: updateQuestion, isLoading: isSaving } = useUpdateQuestion();
	const { mutateAsync: deleteQuestion, isLoading: isDeleting } = useDeleteQuestion();
	const isLoading = isSaving || isDeleting;
	const {
		handleSubmit,
		control,
		reset,
		formState: { errors, isDirty }
	} = useForm<FormFields>({
		mode: "onTouched",
		resolver: zodResolver(updateQuestionSchema),
		defaultValues: {
			title,
			answers
		}
	});

	const { fields, append, remove } = useFieldArray({
		name: "answers",
		control
	});

	const onSubmit: SubmitHandler<FormFields> = async (data) => {
		try {
			await updateQuestion({ ...data, questionId: id, quizId });

			toast.success("Question has been updated");

			router.replace(`/quizzes/${quizId}/edit/questions`);

			reset();
		} catch (err) {
			if (err instanceof Error) {
				toast.error(err.message);
			}

			console.error(err);
		}
	};

	const appendQuestion = () => append({ text: "", correct: false });

	const handleDelete = async () => {
		try {
			await deleteQuestion({ quizId, questionId: id });

			toast.success("Question has been deleted");

			router.replace(`/quizzes/${quizId}/edit/questions`);
		} catch (err) {
			if (err instanceof Error) {
				toast.error(err.message);
			}

			console.error(err);
		}
	};

	return (
		<>
			<form
				className="max-w-[42rem] md:max-w-none"
				onSubmit={handleSubmit(onSubmit)}
			>
				<InputField
					className="max-w-[42rem]"
					name="title"
					control={control}
					placeholder="Question"
					disabled={isLoading}
				/>
				<div className="mt-8 grid md:grid-cols-2 gap-3">
					{fields.map((field, index) => (
						<AnswerField
							textName={`answers.${index}.text`}
							checkboxName={`answers.${index}.correct`}
							control={control}
							disabled={isLoading}
							removeField={() => remove(index)}
							preventRemoval={fields.length <= 2}
							key={field.id}
						/>
					))}
					{fields.length < 6 && (
						<Button
							className={clsx(
								"w-full h-fit",
								fields.length % 2 ? "" : "md:col-span-2"
							)}
							variant="secondary-outline"
							size="lg"
							onClick={appendQuestion}
							disabled={isLoading}
							type="button"
						>
							Add answer
						</Button>
					)}
				</div>
				{errors.answers?.message && (
					<FormError
						className="mt-4 text-center"
						message={errors.answers.message.toString()}
					/>
				)}
				<div className="mt-8 flex items-center gap-x-3">
					<Button
						size="lg"
						disabled={!isDirty || isLoading}
						isLoading={isSaving}
					>
						Save changes
					</Button>
					<Button
						size="lg"
						variant="danger"
						onClick={handleDelete}
						disabled={isLoading}
						isLoading={isDeleting}
						type="button"
					>
						Delete question
					</Button>
				</div>
			</form>
		</>
	);
};

export default EditQuestionForm;
