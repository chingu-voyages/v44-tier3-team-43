import { getUserSession } from "@/lib/auth";
import { getQuiz } from "@/utils/fetchers";

const Layout = async ({
	children,
	params: { quizId }
}: {
	children: React.ReactNode;
	params: { quizId: string };
}) => {
	const [session, quiz] = await Promise.all([getUserSession(), getQuiz(quizId)]);

	if (session?.user.id !== quiz.userId) {
		throw new Error("403 Forbidden");
	}

	return <>{children}</>;
};

export default Layout;
