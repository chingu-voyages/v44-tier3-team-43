"use client";

import { useForm } from "react-hook-form";
import InputField from "@/components/InputField";
import { emailFieldRules, passwordFieldRules, urlFieldRules } from "@/utils/validation";
import Button from "@/components/Button";
import { FcGoogle } from "react-icons/fc";
import { signIn } from "next-auth/react";
import { useState } from "react";

const SignUp = () => {
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const { control, handleSubmit, getValues } = useForm({
		mode: "onTouched"
	});

	const onSubmit = () => {};

	const repeatPassword = (val: string) => {
		const { password } = getValues();

		return (val && password === val) || "Passwords should match!";
	};

	const handleSignUpWithGoogle = async () => {
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
				name="name"
				control={control}
				rules={{
					required: true
				}}
				placeholder="Name"
				autoComplete="off"
				type="text"
				disabled={isLoading}
			/>
			<InputField
				className="mt-7"
				name="photo"
				control={control}
				rules={{ ...urlFieldRules }}
				placeholder="Photo URL (optional)"
				autoComplete="off"
				type="url"
				disabled={isLoading}
			/>
			<InputField
				className="mt-7"
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
					...passwordFieldRules
				}}
				placeholder="Password"
				type="password"
				disabled={isLoading}
			/>
			<InputField
				className="mt-7"
				name="repeat_password"
				control={control}
				rules={{
					required: true,
					validate: repeatPassword
				}}
				placeholder="Repeat password"
				type="password"
				disabled={isLoading}
			/>
			<Button className="mt-7" isLoading={isLoading}>
				Sign up
			</Button>
			<Button
				className="mt-5"
				variant="outline"
				showLoadingIcon={false}
				onClick={handleSignUpWithGoogle}
				isLoading={isLoading}
				type="button"
			>
				<FcGoogle />
				Sign up with Google
			</Button>
		</form>
	);
};

export default SignUp;
