import { Answer, Question } from "@prisma/client";

export interface ICategory {
	name: string;
	_count: {
		quizzes: number;
	};
}

export interface IQuiz {
	id: string;
	title: string;
	image: string;
	userId: string;
	category: string;
	createdAt: string;
	attempts: number;
	User: {
		name: string;
		image: string;
	};
}

export interface IExtendedQuiz extends IQuiz {
	_count: {
		questions: number;
	};
}

export interface IQuestion extends Question {
	answers: Answer[];
}
