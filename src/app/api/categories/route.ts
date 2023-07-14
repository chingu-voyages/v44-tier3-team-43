import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { z } from "zod";

export const GET = async () => {
	try {
		const categories = await prisma.category.findMany({
			orderBy: {
				name: "asc"
			},
			include: {
				_count: {
					select: {
						quizzes: true
					}
				}
			}
		});

		return NextResponse.json(categories, {
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
