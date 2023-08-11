import twclsx from "@/utils/twclsx";
import FormError from "@/components/FormError";
import { useController } from "react-hook-form";
import ImageUpload from "@/components/ImageUpload";

interface IProps {
	name: string;
	control: any;
	containerClassName?: string;
	errorClassName?: string;
	thumbUrl?: string;
	disabled?: boolean;
}

const ImageUploadField = ({
	name,
	control,
	containerClassName,
	errorClassName,
	thumbUrl,
	disabled
}: IProps) => {
	const {
		field: { value, onChange },
		fieldState: { error }
	} = useController({ name, control });

	return (
		<div className={twclsx("flex flex-col gap-y-1", containerClassName)}>
			<ImageUpload
				image={value}
				onImageChange={onChange}
				error={error}
				thumbUrl={thumbUrl}
				disabled={disabled}
			/>
			{error && error.message && (
				<FormError message={error.message} className={errorClassName} />
			)}
		</div>
	);
};

export default ImageUploadField;
