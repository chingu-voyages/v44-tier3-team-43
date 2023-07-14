import { getUserSession } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { extendedQuestionSchema } from "@/utils/schemas";

export const PUT = async (
	req: NextRequest,
	{ params: { quizId, questionId } }: { params: { quizId: string; questionId: string } }
) => {
	try {
		const user = await getUserSession().then((session) => session?.user);

		if (!user) {
			return NextResponse.json("Unauthorized to perform this action!", {
				status: 401
			});
		}

		const body = await req.json();

		const response = extendedQuestionSchema.safeParse(body);

		if (!response.success) {
			return NextResponse.json(response.error.message, {
				status: 400
			});
		}

		const { title, answers } = response.data;

		if (!quizId) {
			return NextResponse.json(
				"Something went wrong! Check if parameters are correct!",
				{
					status: 400
				}
			);
		}

		const quiz = await prisma.quiz.findUnique({
			where: {
				id: quizId
			}
		});

		if (!quiz) {
			return NextResponse.json(
				`Invalid request: Quiz with id '${quizId}' doesn't exist`,
				{
					status: 400
				}
			);
		} else if (quiz?.userId !== user.id) {
			return NextResponse.json("Forbidden", {
				status: 403
			});
		}

		const question = await prisma.question.findUnique({
			where: {
				id: questionId
			}
		});

		if (!question) {
			return NextResponse.json(
				`Invalid request: Question with id '${quizId}' doesn't exist`,
				{
					status: 400
				}
			);
		}

		const answersDB = await prisma.answer.findMany({
			where: {
				questionId
			}
		});

		const answerToDelete = answersDB
			.filter((answerDB) => !answers.some((answer) => answer.id === answerDB.id))
			.map((answer) => answer.id);

		if (answerToDelete.length > 0) {
			await prisma.answer.deleteMany({
				where: {
					id: {
						in: answerToDelete
					}
				}
			});
		}

		Promise.all(
			answers.map(async (answer) => {
				await prisma.answer.upsert({
					where: {
						id: answer.id
					},
					create: {
						questionId,
						text: answer.text,
						correct: answer.correct
					},
					update: {
						text: answer.text,
						correct: answer.correct
					}
				});
			})
		);

		const updatedQuestion = await prisma.question.update({
			where: {
				id: questionId
			},
			data: {
				title: title
			},
			include: {
				answers: true
			}
		});

		return NextResponse.json(updatedQuestion, {
			status: 200
		});
	} catch (err) {
		if (err instanceof z.ZodError) {
			return NextResponse.json(err.message, {
				status: 400
			});
		}

		return NextResponse.json("Internal Server Error", {
			status: 500
		});
	}
};

export const DELETE = async (
	req: NextRequest,
	{ params: { quizId, questionId } }: { params: { quizId: string; questionId: string } }
) => {
	try {
		const user = await getUserSession().then((session) => session?.user);

		if (!user) {
			return NextResponse.json("Unauthorized to perform this action!", {
				status: 401
			});
		}

		if (!quizId) {
			return NextResponse.json(
				"Something went wrong! Check if parameters are correct!",
				{
					status: 400
				}
			);
		}

		const quiz = await prisma.quiz.findUnique({
			where: {
				id: quizId
			}
		});

		if (!quiz) {
			return NextResponse.json(
				`Invalid request: Quiz with id '${quizId}' doesn't exist`,
				{
					status: 400
				}
			);
		} else if (quiz?.userId !== user.id) {
			return NextResponse.json("Forbidden", {
				status: 403
			});
		}

		const question = await prisma.question.findUnique({
			where: {
				id: questionId
			}
		});

		if (!question) {
			return NextResponse.json(
				`Invalid request: Question with id '${quizId}' doesn't exist`,
				{
					status: 400
				}
			);
		}

		await prisma.question.delete({
			where: {
				id: questionId
			}
		});

		return NextResponse.json(
			"The selected question and related answers have been successfully deleted!",
			{
				status: 200
			}
		);
	} catch (err) {
		if (err instanceof z.ZodError) {
			return NextResponse.json(err.message, {
				status: 400
			});
		}

		return NextResponse.json("Internal Server Error", {
			status: 500
		});
	}
};
