import { prisma } from "@/lib/prisma";
import generateZodMessage from "@/utils/generateZodMessage";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export const GET = async (req: NextRequest) => {
	try {
		const category = req.nextUrl.searchParams.get("category");
		const query = req.nextUrl.searchParams.get("query");
		const sortBy = req.nextUrl.searchParams.get("sort_by");
		const page = Number(req.nextUrl.searchParams.get("page")) || 1;
		const perPage = Number(req.nextUrl.searchParams.get("per_page")) || 20;

		if (!(category || query || sortBy === "featured" || sortBy === "latest")) {
			return NextResponse.json(
				"Something went wrong! Check if parameters are correct!",
				{
					status: 400
				}
			);
		}

		const data = await prisma.quiz.findMany({
			where: {
				...(query
					? {
							title: {
								contains: query,
								mode: "insensitive"
							}
					  }
					: {}),
				...(category
					? {
							category: {
								equals: category,
								mode: "insensitive"
							}
					  }
					: {}),
				questions: {
					some: {
						id: {
							not: undefined
						}
					}
				}
			},
			...(sortBy === "featured"
				? {
						orderBy: {
							attempts: "desc"
						}
				  }
				: {}),
			...(sortBy === "latest"
				? {
						orderBy: {
							createdAt: "desc"
						}
				  }
				: {}),
			skip: (page - 1) * perPage,
			take: perPage,
			include: {
				_count: true,
				User: true
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
