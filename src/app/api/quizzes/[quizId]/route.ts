import { getUserSession } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { updateQuizSchema } from "@/utils/schemas";
import imagekit from "@/lib/imageKit";
import generateZodMessage from "@/utils/generateZodMessage";

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
			return NextResponse.json(generateZodMessage(err.issues), {
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

		if (!quiz) {
			return NextResponse.json("No quiz found!", {
				status: 404
			});
		} else if (quiz.userId !== user.id) {
			return NextResponse.json("Forbidden", {
				status: 403
			});
		}

		const formData = await req.formData();

		const formTitle = formData.get("title") as string | null;
		const formCategory = formData.get("category") as string | null;
		const formImage = formData.get("image") as Blob | null;

		const { title, category, image } = updateQuizSchema.parse({
			title: formTitle,
			category: formCategory,
			image: formImage
		});

		let dbCategory;

		if (category) {
			dbCategory = await prisma.category.findFirst({
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
		}

		let imageUrl;

		if (image) {
			const buffer = Buffer.from(await image.arrayBuffer());

			const uploadedImage = await imagekit.upload({
				file: buffer,
				fileName: image.name,
				useUniqueFileName: true
			});

			imageUrl = imagekit.url({
				src: uploadedImage.url,
				transformation: [
					{
						width: 1024
					}
				]
			});
		}

		const updatedQuiz = await prisma.quiz.update({
			where: {
				id: quizId
			},
			data: {
				...(title
					? {
							title
					  }
					: {}),
				...(dbCategory
					? {
							category: dbCategory.name
					  }
					: {}),
				...(image
					? {
							image: imageUrl
					  }
					: {})
			},
			include: {
				_count: true,
				User: true
			}
		});

		return NextResponse.json(updatedQuiz, {
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
			return NextResponse.json(generateZodMessage(err.issues), {
				status: 400
			});
		}

		return NextResponse.json("Internal Server Error", {
			status: 500
		});
	}
};
