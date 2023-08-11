import { Answer, Question, Quiz } from "@prisma/client";

export interface ICategory {
	name: string;
	_count: {
		quizzes: number;
	};
}

export interface IQuiz extends Quiz {
	User: {
		name: string;
		image: string;
	};
	_count: {
		questions: number;
	};
}

export interface IQuestion extends Question {
	answers: Answer[];
}
