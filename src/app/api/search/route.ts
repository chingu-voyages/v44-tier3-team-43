import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export const GET = async (req: NextRequest) => {
  try {
    const category = req.nextUrl.searchParams.get("category");
    const query = req.nextUrl.searchParams.get("query");
    const sortBy = req.nextUrl.searchParams.get("sort_by");
    const page = Number(req.nextUrl.searchParams.get("page")) || 1;
    const perPage = Number(req.nextUrl.searchParams.get("per_page")) || 15;    

    if (!(category || query || sortBy === "featured" || sortBy === "latest")) {
      return NextResponse.json(
        {
          error: {
            message: "Something went wrong! Check if parameters are correct!",
          },
        },
        {
          status: 400,
        }
      );
    }

    const data = await prisma.quiz.findMany({
      ...(category
        ? {
            where: {
              category: (category.charAt(0).toUpperCase() + category.toLowerCase().slice(1)),
            },
            orderBy: {
              title: "asc",
            },
          }
        : {}),
      ...(query
        ? {
            where: {
              title: {
                contains: query,
                mode: "insensitive",
              },
            },
          }
        : {}),
      ...(sortBy === "featured"
        ? {
            orderBy: {
              attempts: "desc",
            },
          }
        : {}),
      ...(sortBy === "latest"
        ? {
            orderBy: {
              createdAt: "desc",
            },
          }
        : {}),
      skip: (page - 1) * perPage,
      take: perPage,
    });

    return NextResponse.json(
      {
        data,
      },
      {
        status: 200,
      }
    );
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json(
        {
          error: err.issues,
        },
        {
          status: 400,
        }
      );
    }

    return NextResponse.json(
      {
        error: "Internal Server Error",
      },
      {
        status: 500,
      }
    );
  }
};
