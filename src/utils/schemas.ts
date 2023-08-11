import { z } from "zod";
import removeExtraSpaces from "./removeExtraSpaces";

export const createAnswerSchema = z.object({
	text: z.preprocess(
		(text) => removeExtraSpaces(text as string),
		z
			.string()
			.min(1, "Answer is required")
			.max(100, { message: "Answer must contain at most 100 characters" })
	),
	correct: z.boolean()
});

export const updateAnswerSchema = createAnswerSchema.extend({
	id: z.string().optional()
});

export const createQuestionSchema = z.object({
	title: z.preprocess(
		(title) => removeExtraSpaces(title as string),
		z
			.string()
			.min(3, { message: "Question must contain at least 3 characters" })
			.max(200, { message: "Question must contain at most 200 characters" })
	),
	answers: z
		.array(createAnswerSchema)
		.min(2, { message: "Question must contain at least 2 answers" })
		.max(6, { message: "Question must contain at most 6 answers" })
		.refine(
			(answers) => answers.some((answer) => answer.correct),
			"Question must contain at least 1 correct answer"
		)
});

export const updateQuestionSchema = z.object({
	title: z
		.preprocess((title) => {
			if (!title) return title;

			return removeExtraSpaces(title as string);
		}, z.string().min(3, { message: "Question must contain at least 3 characters" }).max(200, { message: "Question must contain at most 200 characters" }))
		.optional(),
	answers: z
		.array(updateAnswerSchema)
		.min(2, { message: "Question must contain at least 2 answers" })
		.max(6, { message: "Question must contain at most 6 answers" })
		.refine(
			(answers) => answers.some((answer) => answer.correct),
			"Question must contain at least 1 correct answer"
		)
		.optional()
});

export const createQuizSchema = z.object({
	title: z.preprocess(
		(title) => removeExtraSpaces(title as string),
		z
			.string()
			.min(3, { message: "Title must contain at least 3 characters" })
			.max(200, { message: "Title must contain at most 200 characters" })
	),
	category: z.preprocess(
		(category) => removeExtraSpaces(category as string),
		z.string().min(1, { message: "Category is required" })
	),
	image: z
		.custom<Blob>()
		.refine((file) => file, "Image is required")
		.refine((file) => file && file?.size <= 5242880, "Max file size is 5 Mb")
		.refine(
			(file) => file?.type === "image/jpeg",
			"Only .jpg and .jpeg files are accepted"
		)
});

export const updateQuizSchema = z.object({
	title: z.preprocess((title) => {
		if (!title) return title;

		return removeExtraSpaces(title as string);
	}, z.string().min(3, { message: "Title must contain at least 3 characters" }).max(200, { message: "Title must contain at most 200 characters" }).optional().or(z.null())),
	category: z.preprocess((category) => {
		if (!category) return category;

		return removeExtraSpaces(category as string);
	}, z.string().min(1, { message: "Category is required" }).optional().or(z.null())),
	image: z
		.custom<Blob>()
		.refine((file) => file, "Image is required")
		.refine((file) => file && file?.size <= 5242880, "Max file size is 5 Mb")
		.refine(
			(file) => file?.type === "image/jpeg",
			"Only .jpg and .jpeg files are accepted"
		)
		.optional()
		.or(z.null())
});
