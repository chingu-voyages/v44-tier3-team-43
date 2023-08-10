"use client";

import { IQuiz } from "@/types/api";
import { useForm, SubmitHandler } from "react-hook-form";
import { updateQuizSchema } from "@/utils/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "react-toastify";
import InputField from "@/components/InputField";
import CategoriesSelectField from "@/components/CategoriesSelectField";
import ImageUploadField from "@/components/ImageUploadField";
import Button, { buttonVariants } from "@/components/Button";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import useUpdateQuiz from "@/hooks/useUpdateQuiz";
import useDeleteQuiz from "@/hooks/useDeleteQuiz";
import DeletionAlert from "@/components/DeletionAlert";

type Props = Pick<IQuiz, "id" | "title" | "category" | "image">;

type FormFields = z.infer<typeof updateQuizSchema>;

const EditQuizForm = ({ id, title, category, image }: Props) => {
	const pathname = usePathname();
	const router = useRouter();
	const { mutateAsync: updateQuiz, isLoading: isSaving } = useUpdateQuiz();
	const { mutateAsync: deleteQuiz, isLoading: isDeleting } = useDeleteQuiz();
	const isLoading = isSaving || isDeleting;
	const {
		handleSubmit,
		control,
		reset,
		formState: { isDirty }
	} = useForm<FormFields>({
		mode: "onTouched",
		resolver: zodResolver(updateQuizSchema),
		defaultValues: {
			title: title,
			category: category.toLowerCase(),
			image: null
		}
	});

	const onSubmit: SubmitHandler<FormFields> = async ({ title, category, image }) => {
		try {
			const formData = new FormData();

			if (title) formData.append("title", title);
			if (category) formData.append("category", category);
			if (image) formData.append("image", image);

			await updateQuiz({ formData, quizId: id });

			toast.success("Quiz has been updated");

			router.replace(`/quizzes/${id}`);

			reset({ title, category, image: null });
		} catch (err) {
			if (err instanceof Error) {
				toast.error(err.message);
			}

			console.error(err);
		}
	};

	const handleDelete = async () => {
		try {
			await deleteQuiz(id);

			toast.success("Quiz has been deleted");

			router.replace("/my-quizzes");
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
				className="flex flex-col md:flex-row md:justify-between items-start gap-x-8 gap-y-6"
				onSubmit={handleSubmit(onSubmit)}
			>
				<div className="max-w-[42rem] w-full flex flex-col gap-y-4 lg:gap-y-6">
					<InputField
						name="title"
						control={control}
						placeholder="Title"
						disabled={isLoading}
					/>
					<CategoriesSelectField
						name="category"
						control={control}
						disabled={isLoading}
					/>
					<ImageUploadField
						name="image"
						control={control}
						thumbUrl={image}
						disabled={isLoading}
					/>
				</div>
				<div className="flex items-center gap-x-3">
					<DeletionAlert
						Trigger={
							<Button
								variant="danger"
								size="lg"
								disabled={isLoading}
								isLoading={isDeleting}
							>
								Delete
							</Button>
						}
						description="Do you really want to delete this quiz? This action cannot be undone."
						onDelete={handleDelete}
					/>
					<Button
						size="lg"
						disabled={!isDirty || isLoading}
						isLoading={isSaving}
					>
						Save changes
					</Button>
				</div>
			</form>
			<Link
				className={buttonVariants({
					className: "mt-8",
					size: "lg",
					variant: "secondary-outline"
				})}
				href={`${pathname}/questions`}
			>
				Manage questions
			</Link>
		</>
	);
};

export default EditQuizForm;
