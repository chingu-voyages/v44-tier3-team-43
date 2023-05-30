"use client";

import { useForm } from "react-hook-form";
import InputField from "@/components/InputField";
import { emailFieldRules } from "@/utils/validation";
import Button from "@/components/Button";
import { FcGoogle } from "react-icons/fc";
import { signIn } from "next-auth/react";
import { useState } from "react";

const SignIn = () => {
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const { control, handleSubmit } = useForm({
		mode: "onTouched"
	});

	const onSubmit = async () => {
		await signIn("credentials");
	};

	const handleSignInWithGoogle = async () => {
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
		<form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
			<InputField
				className="mt-11"
				name="email"
				control={control}
				rules={{
					...emailFieldRules
				}}
				placeholder="E-mail"
				autoComplete="off"
				type="text"
				disabled={isLoading}
			/>
			<InputField
				className="mt-7"
				name="password"
				control={control}
				rules={{
					required: true
				}}
				placeholder="Password"
				type="password"
				disabled={isLoading}
			/>
			<Button className="mt-7" isLoading={isLoading}>
				Sign in
			</Button>
			<Button
				className="mt-5"
				variant="outline"
				showLoadingIcon={false}
				onClick={handleSignInWithGoogle}
				isLoading={isLoading}
				type="button"
			>
				<FcGoogle />
				Sign in with Google
			</Button>
		</form>
	);
};

export default SignIn;
