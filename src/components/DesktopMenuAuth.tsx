import { getUserSession } from "@/lib/auth";
import User from "@/components/User";
import LoginButton from "@/components/LoginButton";

const DesktopMenuAuth = async () => {
	const session = await getUserSession();

	return (
		<div className="hidden lg:flex items-center">
			{session ? (
				<User name={session.user.name!} image={session.user.image!} />
			) : (
				<LoginButton />
			)}
		</div>
	);
};

export default DesktopMenuAuth as unknown as () => JSX.Element;
