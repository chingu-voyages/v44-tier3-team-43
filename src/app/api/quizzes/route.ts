import { getUserSession } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { quizSchema } from "@/utils/schemas";
import { prisma } from "@/lib/prisma";

export const POST = async (req: NextRequest) => {
	try {
		const user = await getUserSession().then((session) => session?.user);

		if (!user) {
			return NextResponse.json(
				{
					error: {
						message: "Unauthorized to perform this action"
					}
				},
				{
					status: 401
				}
			);
		}

		const body = await req.json();

		const response = quizSchema.safeParse(body);

		if (!response.success) {
			const { errors } = response.error;

			return NextResponse.json(
				{
					error: { message: "Invalid request", errors }
				},
				{
					status: 400
				}
			);
		}

		const { category, questions, title, image } = response.data;

		const createdQuiz = await prisma.quiz.create({
			data: {
				userId: user.id,
				category,
				title,
				image:
					image ||
					"https://archive.org/download/placeholder-image/placeholder-image.jpg"
			}
		});

		const createdQuestions = await Promise.all(
			questions.map(
				async (question) =>
					await prisma.question.create({
						data: {
							quizId: createdQuiz.id,
							title: question.title,
							answers: {
								createMany: {
									data: question.answers.map((answer) => ({
										text: answer.text,
										correct: answer.correct
									}))
								}
							}
						},
						include: {
							answers: true
						}
					})
			)
		);

		const data = { ...createdQuiz, questions: [...createdQuestions] };

		return NextResponse.json(
			{
				data
			},
			{
				status: 200
			}
		);
	} catch (err) {
		if (err instanceof z.ZodError) {
			return NextResponse.json(
				{
					error: err.issues
				},
				{
					status: 400
				}
			);
		}

		return NextResponse.json(
			{
				error: "Internal Server Error"
			},
			{
				status: 500
			}
		);
	}
};
