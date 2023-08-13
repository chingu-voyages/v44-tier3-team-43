import { getUserSession } from "@/lib/auth";
import LogoutButton from "@/components/LogoutButton";
import LoginButton from "@/components/LoginButton";

const MobileMenuAuth = async () => {
	const session = await getUserSession();

	return <>{session ? <LogoutButton size="sm" /> : <LoginButton size="sm" />}</>;
};

export default MobileMenuAuth as unknown as () => JSX.Element;
