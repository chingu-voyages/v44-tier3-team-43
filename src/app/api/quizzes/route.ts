import { getUserSession } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { quizSchema } from "@/utils/schemas";
import { prisma } from "@/lib/prisma";

export const POST = async (req: NextRequest) => {
	try {
		const user = await getUserSession().then((session) => session?.user);

		if (!user) {
			return NextResponse.json("Unauthorized to perform this action", {
				status: 401
			});
		}

		const body = await req.json();

		const response = quizSchema.safeParse(body);

		if (!response.success) {
			return NextResponse.json(response.error.message, {
				status: 400
			});
		}

		const { title, category, image } = response.data;

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

		const data = await prisma.quiz.create({
			data: {
				userId: user.id,
				category: dbCategory.name,
				title,
				image:
					image ||
					"https://archive.org/download/placeholder-image/placeholder-image.jpg"
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
