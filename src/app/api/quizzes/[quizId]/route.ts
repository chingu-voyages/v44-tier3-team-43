import { getUserSession } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { quizSchema } from "@/utils/schemas";
import { prisma } from "@/lib/prisma";

export const GET = async (
	req: NextRequest,
	{ params: { quizId } }: { params: { quizId: string } }
) => {
	try {
		const quiz = await prisma.quiz.findUnique({
			where: {
				id: quizId
			},
			include: {
				_count: true,
				User: true
			}
		});

		if (!quiz) {
			return NextResponse.json("No quiz found!", {
				status: 404
			});
		}

		return NextResponse.json(quiz, {
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

export const PUT = async (
	req: NextRequest,
	{ params: { quizId } }: { params: { quizId: string } }
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

		if (quiz?.userId !== user.id) {
			return NextResponse.json("Forbidden", {
				status: 403
			});
		}

		const body = await req.json();

		const response = quizSchema.safeParse(body);

		if (!response.success) {
			return NextResponse.json("Invalid request", {
				status: 400
			});
		}

		const { category, title, image } = response.data;

		const dbCategory = await prisma.category.findFirst({
			where: {
				name: {
					equals: category,
					mode: "insensitive"
				}
			}
		});

		if (!dbCategory) {
			return NextResponse.json(
				`Invalid request: Category '${category}' doesn't exist`,
				{
					status: 400
				}
			);
		}

		const data = await prisma.quiz.update({
			where: {
				id: quizId
			},
			data: {
				category: dbCategory.name,
				title,
				image
			}
		});

		return NextResponse.json(data, {
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
	{ params: { quizId } }: { params: { quizId: string } }
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
		} else if (quiz.userId !== user.id) {
			return NextResponse.json("Forbidden", {
				status: 403
			});
		}

		await prisma.quiz.delete({
			where: {
				id: quizId
			}
		});

		return NextResponse.json(
			"The selected quiz and related questions have been successfully deleted!",
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
