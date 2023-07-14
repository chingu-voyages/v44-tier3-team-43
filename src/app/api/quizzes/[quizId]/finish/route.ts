import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";

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
            return NextResponse.json(
                {
                    error: {
                        message: "No quiz found!"
                    }
                },
                {
                    status: 404
                }
            );
        }

        await prisma.quiz.update({
            where: {
                id: quizId
            },
            data: {
                attempts: quiz.attempts + 1
            }
        });

        return NextResponse.json(
            {
                data: {
                    message: "The count was updated!"
                }
            },
            {
                status: 200
            }
        );
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
