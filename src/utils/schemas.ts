import { z } from "zod";

export const answerSchema = z.object({
	text: z.string().max(100),
	correct: z.boolean()
});

export const extendedAnswerSchema = answerSchema.extend({
	id: z.string()
})

export const questionSchema = z.object({
	title: z.string().max(100),
	answers: z.array(answerSchema).min(2).max(4)
});

export const extendedQuestionSchema = questionSchema.extend({
	answers: z.array(extendedAnswerSchema).min(2).max(4)
})

export const quizSchema = z.object({
	title: z.string().max(100),
	category: z.string(),
	image: z
		.string()
		.regex(/^(ftp|http|https):\/\/[^ "]+$/)
		.optional()
});
