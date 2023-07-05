import { getUserSession } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { questionSchema } from "@/utils/schemas";
import { prisma } from "@/lib/prisma";

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
				{
					error: {
						message: `Invalid request: Quiz with id '${quizId}' doesn't exist`
					}
				},
				{
					status: 400
				}
			);
		}

		const questions = await prisma.question.findMany({
			where: {
				quizId: quizId
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

export const POST = async (
	req: NextRequest,
	{ params: { quizId } }: { params: { quizId: string } }
) => {
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

		const response = questionSchema.safeParse(body);

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

		const { title, answers } = response.data;

		const quiz = await prisma.quiz.findUnique({
			where: {
				id: quizId
			}
		});

		if (!quiz) {
			return NextResponse.json(
				{
					error: {
						message: `Invalid request: Quiz with id '${quizId}' doesn't exist`
					}
				},
				{
					status: 400
				}
			);
		} else if (quiz.userId !== user.id) {
			return NextResponse.json(
				{
					error: { message: "Forbidden" }
				},
				{
					status: 403
				}
			);
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
				answers: true
			}
		});

		return NextResponse.json(data, {
			status: 200
		});
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
