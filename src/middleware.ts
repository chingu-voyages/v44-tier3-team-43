export { default } from "next-auth/middleware";

export const config = {
	matcher: ["/quizzes/:quizId/edit/:path*"]
};
