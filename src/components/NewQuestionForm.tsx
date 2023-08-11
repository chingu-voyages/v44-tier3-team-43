"use client";

import Button from "@/components/Button";
import InputField from "@/components/InputField";
import { createQuestionSchema } from "@/utils/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFieldArray, SubmitHandler } from "react-hook-form";
import AnswerField from "@/components/AnswerField";
import { z } from "zod";
import clsx from "clsx";
import FormError from "@/components/FormError";
import useCreateQuestion from "@/hooks/useCreateQuestion";
import { toast } from "react-toastify";
import { useParams, useRouter } from "next/navigation";

type FormFields = z.infer<typeof createQuestionSchema>;

const NewQuestionForm = () => {
	const router = useRouter();
	const { quizId } = useParams();
	const { mutateAsync: createQuestion, isLoading } = useCreateQuestion();
	const {
		handleSubmit,
		control,
		reset,
		formState: { errors }
	} = useForm<FormFields>({
		mode: "onTouched",
		resolver: zodResolver(createQuestionSchema),
		defaultValues: {
			title: "",
			answers: Array.from(Array(4), (_) => ({ text: "", correct: false }))
		}
	});

	const { fields, append, remove } = useFieldArray({
		name: "answers",
		control
	});

	const onSubmit: SubmitHandler<FormFields> = async (data) => {
		try {
			await createQuestion({ ...data, quizId: quizId as string });

			toast.success("Question has been added");

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
				<Button className="mt-8" size="lg" isLoading={isLoading}>
					Add question
				</Button>
			</form>
		</>
	);
};

export default NewQuestionForm;
