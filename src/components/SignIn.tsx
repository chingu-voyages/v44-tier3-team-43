import { useForm } from "react-hook-form";
import InputField from "@/components/InputField";
import { emailFieldRules } from "@/utils/validation";
import Button from "@/components/Button";
import { FcGoogle } from "react-icons/fc";

const SignIn = () => {
	const { control, handleSubmit } = useForm({
		mode: "onTouched"
	});

	const onSubmit = () => {};

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
				disabled={false}
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
				disabled={false}
			/>
			<Button className="mt-7">Sign in</Button>
			<Button
				className="mt-5"
				variant="outline"
				showLoadingIcon={false}
				type="button"
			>
				<FcGoogle />
				Sign in with Google
			</Button>
		</form>
	);
};

export default SignIn;
