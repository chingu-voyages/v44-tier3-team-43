import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import generateZodMessage from "@/utils/generateZodMessage";

export const POST = async (
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
			return NextResponse.json("No quiz found!", {
				status: 404
			});
		}

		await prisma.quiz.update({
			where: {
				id: quizId
			},
			data: {
				attempts: quiz.attempts + 1
			}
		});

		return NextResponse.json("The count was updated!", {
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
