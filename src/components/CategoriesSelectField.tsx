import twclsx from "@/utils/twclsx";
import FormError from "@/components/FormError";
import { useController } from "react-hook-form";
import CategoriesSelect from "@/components/CategoriesSelect";

interface IProps {
	name: string;
	control: any;
	containerClassName?: string;
	errorClassName?: string;
	disabled?: boolean;
}

const CategoriesSelectField = ({
	name,
	control,
	containerClassName,
	errorClassName,
	disabled
}: IProps) => {
	const {
		field: { value, onChange },
		fieldState: { error }
	} = useController({ name, control });

	return (
		<div className={twclsx("flex flex-col gap-y-1", containerClassName)}>
			<CategoriesSelect
				value={value}
				onValueChange={onChange}
				error={error}
				disabled={disabled}
				disableAny
			/>
			{error && error.message && (
				<FormError message={error.message} className={errorClassName} />
			)}
		</div>
	);
};

export default CategoriesSelectField;
