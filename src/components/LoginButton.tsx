"use client";

import { signIn } from "next-auth/react";
import Button from "@/components/Button";
import { useState } from "react";

const GoogleButton = ({ ...rest }: React.ComponentProps<typeof Button>) => {
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const signInWithGoogle = async () => {
		try {
			setIsLoading(true);

			await signIn("google");
		} catch (err) {
			console.log(err);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<Button onClick={signInWithGoogle} isLoading={isLoading} {...rest}>
			Sign in
		</Button>
	);
};

export default GoogleButton;
