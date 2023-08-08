import { getUserSession } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { createQuizSchema } from "@/utils/schemas";
import { prisma } from "@/lib/prisma";
import imagekit from "@/lib/imageKit";
import generateZodMessage from "@/utils/generateZodMessage";

export const POST = async (req: NextRequest) => {
	try {
		const user = await getUserSession().then((session) => session?.user);

		if (!user) {
			return NextResponse.json("Unauthorized to perform this action", {
				status: 401
			});
		}

		const formData = await req.formData();

		const formTitle = formData.get("title") as string | null;
		const formCategory = formData.get("category") as string | null;
		const formImage = formData.get("image") as Blob | null;

		const { title, category, image } = createQuizSchema.parse({
			title: formTitle,
			category: formCategory,
			image: formImage
		});

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

		const buffer = Buffer.from(await image.arrayBuffer());

		const uploadedImage = await imagekit.upload({
			file: buffer,
			fileName: image.name,
			useUniqueFileName: true
		});

		const imageUrl = imagekit.url({
			src: uploadedImage.url,
			transformation: [
				{
					width: 1024
				}
			]
		});

		const quiz = await prisma.quiz.create({
			data: {
				userId: user.id,
				title,
				category: dbCategory.name,
				image: imageUrl
			},
			include: {
				_count: true,
				User: true
			}
		});

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
