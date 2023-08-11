import clsx from "clsx";
import { FormEvent, KeyboardEvent, useEffect, useRef } from "react";
import { UseFieldArrayRemove, useController } from "react-hook-form";
import { IoMdClose } from "react-icons/io";
import { buttonVariants } from "@/components/Button";
import { CheckboxIndicator, CheckboxRoot } from "@/components/Checkbox";
import twclsx from "@/utils/twclsx";
import FormError from "@/components/FormError";

interface IProps {
	textName: string;
	checkboxName: string;
	control: any;
	removeField: UseFieldArrayRemove;
	preventRemoval?: boolean;
	disabled?: boolean;
	containerClassName?: string;
	errorClassName?: string;
}

const AnswerField = ({
	textName,
	checkboxName,
	control,
	removeField,
	preventRemoval,
	disabled
}: IProps) => {
	const textRef = useRef<HTMLDivElement>(null);

	const {
		field: { value: text, onChange: onTextChange },
		fieldState: { error }
	} = useController({ name: textName, control });
	const {
		field: { value: isCorrect, onChange: onIsCorrectChange }
	} = useController({ name: checkboxName, control });

	const handleInput = (e: FormEvent<HTMLDivElement>) => {
		if (!e.currentTarget.textContent) return onTextChange("");

		e.currentTarget.textContent = e.currentTarget.textContent.replace(/\n/g, "");

		onTextChange(e.currentTarget.textContent);
	};

	const handleCheck = (checked: boolean) => onIsCorrectChange(checked);

	const handleEnterPress = (e: KeyboardEvent<HTMLDivElement>) => {
		if (e.key === "Enter") e.preventDefault();
	};

	const handleRemoval = () => removeField();

	useEffect(() => {
		if (textRef.current) textRef.current.textContent = text;
	}, [text]);

	return (
		<div className="relative max-w-[42rem] md:max-w-none rounded-md">
			<div
				className={twclsx(
					buttonVariants({
						variant: "secondary",
						size: "lg"
					}),
					clsx(
						"w-full justify-start md:justify-center whitespace-pre-line",
						"break-all hover:opacity-100 active:opacity-100 font-normal",
						disabled ? "opacity-40 pointer-events-none" : ""
					)
				)}
			>
				<div
					className={clsx(
						"min-w-[4rem] w-full md:w-fit md:text-center empty:before:content-[attr(placeholder)]",
						"before:text-light-grey before:pointer-events-none",
						"focus-visible:before:content-none transition duration-50",
						"border border-dashed border-transparent focus-visible:hover:border-transparent",
						disabled ? "" : "hover:border-light-grey",
						error ? "ring-1 ring-custom-red focus-visible:ring-red-600" : ""
					)}
					contentEditable={!disabled}
					placeholder="Answer"
					onInput={handleInput}
					onKeyDown={handleEnterPress}
					ref={textRef}
				></div>
			</div>
			{error?.message && <FormError className="ml-2" message={error.message} />}
			<label
				className={twclsx(
					"mt-2 ml-2 w-fit flex items-center gap-x-2 text-sm select-none opacity-80 transition",
					"duration-200 hover:opacity-100 focus-within:ring-1 ring-custom-green",
					isCorrect ? "opacity-100" : "",
					disabled ? "opacity-40 pointer-events-none" : ""
				)}
			>
				Correct answer
				<CheckboxRoot
					className="cursor-default"
					checked={isCorrect}
					onCheckedChange={handleCheck}
					disabled={disabled}
				>
					<CheckboxIndicator />
				</CheckboxRoot>
			</label>
			<button
				className={clsx(
					"absolute -right-2 -top-2 bg-light-grey bg-opacity-50 rounded-full transition",
					"duration-200 hover:opacity-80 active:opacity-60 focus-visible:bg-opacity-80",
					"disabled:pointer-events-none disabled:opacity-40"
				)}
				onClick={handleRemoval}
				disabled={preventRemoval || disabled}
				type="button"
			>
				<IoMdClose className="w-4 h-4" />
			</button>
		</div>
	);
};

export default AnswerField;
