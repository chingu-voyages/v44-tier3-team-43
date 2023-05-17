import clsx from "clsx";
import { useController, UseControllerProps } from "react-hook-form";
import { DetailedHTMLProps, InputHTMLAttributes } from "react";

interface IProps
	extends UseControllerProps,
		DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
	name: string;
	defaultValue?: any;
}

const InputField = ({
	name,
	control,
	rules,
	defaultValue,
	className,
	...rest
}: IProps) => {
	const { field, fieldState } = useController({
		name,
		control,
		rules,
		defaultValue
	});

	const { error } = fieldState;

	return (
		<div>
			<input
				className={clsx(
					"w-full py-1 border-b placeholder:text-light-grey text-custom-white bg-transparent",
					"focus:border-custom-green focus:ring-0 focus:placeholder:-translate-x-full placeholder:transition",
					error ? "border-red-500" : "border-light-grey",
					className
				)}
				{...field}
				{...rest}
			/>
			{error && (
				<p className="mt-1 text-sm text-red-500">
					{error?.message}
					{error?.type === "required" && "This field is required"}
				</p>
			)}
		</div>
	);
};

export default InputField;
