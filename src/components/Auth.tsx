"use client";

import { useState } from "react";
import SignUp from "@/components/SignUp";
import SignIn from "@/components/SignIn";
import clsx from "clsx";
import Heading from "@/components/Heading";

const Auth = () => {
	const [isNewAccount, setIsNewAccount] = useState<boolean>(false);

	const toggleIsNewAccount = () => setIsNewAccount(!isNewAccount);

	return (
		<div className="max-w-[22rem] w-full mx-auto px-5 py-6 pb-14 lg:px-7 lg:pt-8 lg:pb-16 bg-dark-grey rounded-2xl">
			<Heading className="text-center" size="2xl" as="h3">
				{isNewAccount ? "Sign Up" : "Sign In"}
			</Heading>
			{isNewAccount ? <SignUp /> : <SignIn />}
			<button
				className={clsx(
					"block mx-auto mt-6 text-xs text-light-grey underline transition duration-200",
					"hover:opacity-80 active:opacity-60"
				)}
				onClick={toggleIsNewAccount}
			>
				{isNewAccount ? "Already a user?" : "Don't have an account?"}
			</button>
		</div>
	);
};

export default Auth;
