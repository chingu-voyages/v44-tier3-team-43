import { getUserSession } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { createQuestionSchema } from "@/utils/schemas";
import { prisma } from "@/lib/prisma";
import generateZodMessage from "@/utils/generateZodMessage";

export const GET = async (
	req: NextRequest,
	{ params: { quizId } }: { params: { quizId: string } }
) => {
	try {
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
		}

		const questions = await prisma.question.findMany({
			where: {
				quizId: quizId
			},
			orderBy: {
				createdAt: "asc"
			},
			include: {
				answers: true
			}
		});

		return NextResponse.json(questions, {
			status: 200
		});
	} catch (err) {
		if (err instanceof z.ZodError) {
			return NextResponse.json(generateZodMessage(err.issues), {
				status: 400
			});
		}

		return NextResponse.json("Internal Server Error", {
			status: 500
		});
	}
};

export const POST = async (
	req: NextRequest,
	{ params: { quizId } }: { params: { quizId: string } }
) => {
	try {
		const user = await getUserSession().then((session) => session?.user);

		if (!user) {
			return NextResponse.json("Unauthorized to perform this action", {
				status: 401
			});
		}

		const body = await req.json();

		const { title, answers } = createQuestionSchema.parse(body);

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
		} else if (quiz.userId !== user.id) {
			return NextResponse.json("Forbidden", {
				status: 403
			});
		}

		const data = await prisma.question.create({
			data: {
				quizId,
				title,
				answers: {
					createMany: {
						data: answers.map((answer) => ({
							text: answer.text,
							correct: answer.correct
						}))
					}
				}
			},
			include: {
				answers: {
					orderBy: {
						createdAt: "asc"
					}
				}
			}
		});

		return NextResponse.json(data, {
			status: 200
		});
	} catch (err) {
		if (err instanceof z.ZodError) {
			return NextResponse.json(generateZodMessage(err.issues), {
				status: 400
			});
		}

		return NextResponse.json("Internal Server Error", {
			status: 500
		});
	}
};
