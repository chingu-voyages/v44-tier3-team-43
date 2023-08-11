"use client";

import {
	DialogClose,
	DialogContent,
	DialogOverlay,
	DialogRoot,
	DialogTitle
} from "@/components/Dialog";
import { useForm, SubmitHandler } from "react-hook-form";
import Button from "@/components/Button";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { createQuizSchema } from "@/utils/schemas";
import { z } from "zod";
import InputField from "@/components/InputField";
import CategoriesSelectField from "@/components/CategoriesSelectField";
import ImageUploadField from "@/components/ImageUploadField";
import { toast } from "react-toastify";
import useCreateQuiz from "@/hooks/useCreateQuiz";

type FormFields = Omit<z.infer<typeof createQuizSchema>, "image"> & {
	image: Blob | null;
};

const NewQuizDialog = () => {
	const { mutateAsync: createQuiz, isLoading } = useCreateQuiz();
	const { status } = useSession();
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();
	const isOpen = searchParams.get("newQuizOpen");
	const { handleSubmit, control, reset } = useForm<FormFields>({
		mode: "onTouched",
		resolver: zodResolver(createQuizSchema),
		defaultValues: {
			title: "",
			category: "",
			image: null
		}
	});

	if (isOpen && status === "unauthenticated") router.push("/api/auth/signin");

	const onSubmit: SubmitHandler<FormFields> = async ({ title, category, image }) => {
		try {
			const formData = new FormData();

			formData.append("title", title);
			formData.append("category", category);

			if (image) formData.append("image", image);

			const res = await createQuiz(formData);

			toast.success("Quiz has been created");

			router.replace(`/quizzes/${res.id}/edit`);

			reset();
		} catch (err) {
			if (err instanceof Error) {
				toast.error(err.message);
			}

			console.error(err);
		}
	};

	const close = () => {
		const current = new URLSearchParams(Array.from(searchParams.entries()));

		current.delete("newQuizOpen");

		const search = current.toString();

		const query = search ? `?${search}` : "";

		router.push(`${pathname}${query}`);

		reset();
	};

	const handleOpenChange = (open: boolean) => {
		if (!open) close();
	};

	return (
		<DialogRoot open={!!isOpen} onOpenChange={handleOpenChange}>
			<DialogOverlay />
			<DialogContent className="font-normal">
				<DialogTitle>New Quiz</DialogTitle>
				<DialogClose onClick={close} />
				<form
					className="mt-8 lg:mt-11 flex flex-col gap-4 lg:gap-6"
					onSubmit={handleSubmit(onSubmit)}
				>
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
						disabled={isLoading}
					/>
					<Button className="mt-2" size="lg" isLoading={isLoading}>
						Create quiz
					</Button>
				</form>
			</DialogContent>
		</DialogRoot>
	);
};

export default NewQuizDialog;
