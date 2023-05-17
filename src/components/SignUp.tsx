import { useForm } from "react-hook-form";
import InputField from "@/components/InputField";
import { emailFieldRules, passwordFieldRules, urlFieldRules } from "@/utils/validation";
import Button from "@/components/Button";
import { FcGoogle } from "react-icons/fc";

const SignUp = () => {
	const { control, handleSubmit, getValues } = useForm({
		mode: "onTouched"
	});

	const onSubmit = () => {};

	const repeatPassword = (val: string) => {
		const { password } = getValues();

		return (val && password === val) || "Passwords should match!";
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
				disabled={false}
			/>
			<InputField
				className="mt-7"
				name="photo"
				control={control}
				rules={{ ...urlFieldRules }}
				placeholder="Photo URL (optional)"
				autoComplete="off"
				type="url"
				disabled={false}
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
				disabled={false}
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
				disabled={false}
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
				disabled={false}
			/>
			<Button className="mt-7">Sign up</Button>
			<Button
				className="mt-5"
				variant="outline"
				showLoadingIcon={false}
				type="button"
			>
				<FcGoogle />
				Sign up with Google
			</Button>
		</form>
	);
};

export default SignUp;
