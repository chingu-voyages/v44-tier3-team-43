import { getUserSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import generateZodMessage from "@/utils/generateZodMessage";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export const GET = async (req: NextRequest) => {
	try {
		const user = await getUserSession().then((session) => session?.user);

		if (!user) {
			return NextResponse.json("Unauthorized to perform this action", {
				status: 401
			});
		}

		const page = Number(req.nextUrl.searchParams.get("page")) || 1;
		const perPage = Number(req.nextUrl.searchParams.get("per_page")) || 20;

		const data = await prisma.quiz.findMany({
			where: {
				userId: user.id
			},
			orderBy: {
				createdAt: "desc"
			},
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
