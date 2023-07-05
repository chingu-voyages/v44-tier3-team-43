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
