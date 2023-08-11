import twclsx from "@/utils/twclsx";
import { DetailedHTMLProps, InputHTMLAttributes } from "react";
import FormError from "@/components/FormError";
import { useController } from "react-hook-form";

interface IProps
	extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
	name: string;
	control: any;
	containerClassName?: string;
	errorClassName?: string;
}

const InputField = ({
	name,
	control,
	containerClassName,
	className,
	errorClassName,
	disabled,
	...rest
}: IProps) => {
	const {
		field,
		fieldState: { error }
	} = useController({ name, control });

	return (
		<div className={twclsx("flex flex-col gap-y-1", containerClassName)}>
			<input
				className={twclsx(
					"w-full px-3 py-1.5 lg:px-3.5 lg:py-2 lg:text-lg rounded-xl",
					"lg:rounded-2xl bg-dark-grey placeholder:text-light-grey",
					error ? "ring-1 ring-custom-red focus-visible:ring-red-600" : "",
					disabled ? "disabled:pointer-events-none disabled:opacity-40" : "",
					className
				)}
				disabled={disabled}
				{...field}
				{...rest}
			/>
			{error && error.message && (
				<FormError message={error.message} className={errorClassName} />
			)}
		</div>
	);
};

export default InputField;
