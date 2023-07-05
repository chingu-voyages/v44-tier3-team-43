"use client";

import { signOut } from "next-auth/react";
import Button from "@/components/Button";
import { useState } from "react";

const LogoutButton = ({ ...rest }: React.ComponentProps<typeof Button>) => {
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const logOut = async () => {
		try {
			setIsLoading(true);

			await signOut();
		} catch (err) {
			console.log(err);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<Button onClick={logOut} isLoading={isLoading} {...rest}>
			Sign out
		</Button>
	);
};

export default LogoutButton;
