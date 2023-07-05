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
                _count: true
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

        return NextResponse.json(quiz, {
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

export const PUT = async (
    req: NextRequest,
    { params: { quizId } }: { params: { quizId: string } }
) => {
    try {
        const user = await getUserSession().then((session) => session?.user);

        if (!user) {
            return NextResponse.json(
                {
                    error: {
                        message: "Unauthorized to perform this action!"
                    }
                },
                {
                    status: 401
                }
            );
        }

        if (!quizId) {
            return NextResponse.json(
                {
                    error: {
                        message: "Something went wrong! Check if parameters are correct!"
                    }
                },
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
            return NextResponse.json(
                {
                    error: {
                        message: "Unauthorized to perform this action!"
                    }
                },
                {
                    status: 401
                }
            );
        }

        const body = await req.json();

        const response = quizSchema.safeParse(body);

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

        const { category, title, image } = response.data;

        const data = await prisma.quiz.update({
            where: {
                id: quizId
            },
            data: {
                category,
                title,
                image
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

export const DELETE = async (
    req: NextRequest,
    { params: { quizId } }: { params: { quizId: string } }
) => {
    try {
        const user = await getUserSession().then((session) => session?.user);

        if (!user) {
            return NextResponse.json(
                {
                    error: {
                        message: "Unauthorized to perform this action!"
                    }
                },
                {
                    status: 401
                }
            );
        }

        if (!quizId) {
            return NextResponse.json(
                {
                    error: {
                        message: "Something went wrong! Check if parameters are correct!"
                    }
                },
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
            return NextResponse.json(
                {
                    error: { 
                        message: "Unauthorized to perform this action!"
                    }
                },
                {
                    status: 401
                }
            );
        } else {
            await prisma.quiz.delete({
                where: {
                    id: quizId
                }
            });
        }

        return NextResponse.json(
            {
                data: {
                    message: "The selected quiz and related questions has been successfully deleted!"
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
