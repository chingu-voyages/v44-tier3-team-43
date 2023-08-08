import { createQuestionSchema, updateQuestionSchema } from "@/utils/schemas";
import { ICategory, IQuestion, IQuiz } from "@/types/api";
import absoluteUrl from "@/utils/absoluteUrl";
import { z } from "zod";
import { notFound } from "next/navigation";

export const getCategories = async (): Promise<ICategory[]> => {
	const url = absoluteUrl("/api/categories");

	const res = await fetch(url, {
		cache: "no-store"
	});

	const json = res.json();

	if (res.ok) return json;

	throw new Error(await json);
};

export const searchQuizzes = async ({
	query,
	category,
	sortBy,
	page,
	perPage
}: {
	query?: string;
	category?: string;
	sortBy?: "featured" | "latest";
	page?: number;
	perPage?: number;
}): Promise<IQuiz[]> => {
	const params = {
		query: query || "",
		category: category || "",
		sort_by: sortBy || "",
		page: (page && String(page)) || "",
		per_page: (perPage && String(perPage)) || ""
	};

	const filteredParams = Object.fromEntries(
		Object.entries(params).filter(([key, value]) => value !== "")
	);

	const searchParams = new URLSearchParams(filteredParams);

	const url = absoluteUrl("/api/search?" + searchParams);

	const res = await fetch(url, {
		cache: "no-store"
	});

	const json = res.json();

	if (res.ok) return json;

	throw new Error(await json);
};

export const getQuiz = async (id: string): Promise<IQuiz> => {
	const url = absoluteUrl(`/api/quizzes/${id}`);

	const res = await fetch(url, {
		cache: "no-store"
	});

	const json = res.json();

	if (res.ok) return json;

	if (res.status === 404) return notFound();

	throw new Error(await json);
};

export const addQuizAttempt = async (id: string): Promise<string> => {
	const url = absoluteUrl(`/api/quizzes/${id}/finish`);

	const res = await fetch(url, {
		method: "POST"
	});

	const json = res.json();

	if (res.ok) return json;

	throw new Error(await json);
};

export const createQuiz = async (formData: FormData): Promise<IQuiz> => {
	const url = absoluteUrl("/api/quizzes");

	const res = await fetch(url, {
		method: "POST",
		body: formData
	});

	const json = res.json();

	if (res.ok) return json;

	throw new Error(await json);
};

export const updateQuiz = async ({
	formData,
	quizId
}: {
	formData: FormData;
	quizId: string;
}): Promise<IQuiz> => {
	const url = absoluteUrl(`/api/quizzes/${quizId}`);

	const res = await fetch(url, {
		method: "PUT",
		body: formData
	});

	const json = res.json();

	if (res.ok) return json;

	throw new Error(await json);
};

export const deleteQuiz = async (quizId: string): Promise<string> => {
	const url = absoluteUrl(`/api/quizzes/${quizId}`);

	const res = await fetch(url, {
		method: "DELETE"
	});

	const json = res.json();

	if (res.ok) return json;

	throw new Error(await json);
};

export const getQuestions = async (quizId: string): Promise<IQuestion[]> => {
	const url = absoluteUrl(`/api/quizzes/${quizId}/questions`);

	const res = await fetch(url, {
		cache: "no-store"
	});

	const json = res.json();

	if (res.ok) return json;

	throw new Error(await json);
};

export const getQuestion = async ({
	quizId,
	questionId
}: {
	quizId: string;
	questionId: string;
}): Promise<IQuestion> => {
	const url = absoluteUrl(`/api/quizzes/${quizId}/questions/${questionId}`);

	const res = await fetch(url, {
		cache: "no-store"
	});

	const json = res.json();

	if (res.ok) return json;

	if (res.status === 404) return notFound();

	throw new Error(await json);
};

export const createQuestion = async ({
	quizId,
	title,
	answers
}: {
	quizId: string;
} & z.infer<typeof createQuestionSchema>): Promise<IQuestion> => {
	const url = absoluteUrl(`/api/quizzes/${quizId}/questions`);

	const res = await fetch(url, {
		method: "POST",
		body: JSON.stringify({ title, answers })
	});

	const json = res.json();

	if (res.ok) return json;

	throw new Error(await json);
};

export const updateQuestion = async ({
	quizId,
	questionId,
	title,
	answers
}: {
	quizId: string;
	questionId: string;
} & z.infer<typeof updateQuestionSchema>): Promise<IQuestion> => {
	const url = absoluteUrl(`/api/quizzes/${quizId}/questions/${questionId}`);

	const res = await fetch(url, {
		method: "PUT",
		body: JSON.stringify({ title, answers })
	});

	const json = res.json();

	if (res.ok) return json;

	throw new Error(await json);
};

export const deleteQuestion = async ({
	quizId,
	questionId
}: {
	quizId: string;
	questionId: string;
}): Promise<string> => {
	const url = absoluteUrl(`/api/quizzes/${quizId}/questions/${questionId}`);

	const res = await fetch(url, {
		method: "DELETE"
	});

	const json = res.json();

	if (res.ok) return json;

	throw new Error(await json);
};
