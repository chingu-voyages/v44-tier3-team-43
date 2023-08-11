import twclsx from "@/utils/twclsx";
import clsx from "clsx";
import Compressor from "compressorjs";
import { ChangeEvent, useState } from "react";
import { useDropzone } from "react-dropzone";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { BsImage } from "react-icons/bs";
import { IoMdClose } from "react-icons/io";

interface IProps {
	image: Blob | null;
	onImageChange: (image: Blob | null) => void;
	error?: any;
	thumbUrl?: string;
	disabled?: boolean;
}

const ImageUpload = ({ image, onImageChange, error, thumbUrl, disabled }: IProps) => {
	const [imageUrl, setImageUrl] = useState<string | undefined>(
		image ? URL.createObjectURL(image) : thumbUrl
	);

	const [isLoading, setIsLoading] = useState<boolean>(false);

	const handleDrop = (acceptedFiles: File[]) => {
		setImage(acceptedFiles[0]);
	};

	const { getRootProps, getInputProps, isDragActive } = useDropzone({
		onDrop: handleDrop,
		noClick: true
	});

	const setImage = (image: Blob) => {
		setIsLoading(true);

		new Compressor(image, {
			quality: 0.8,
			width: 1024,
			height: 1024,
			success: (file) => {
				onImageChange(file);

				setImageUrl(URL.createObjectURL(file));

				setIsLoading(false);
			},
			error: (err) => {
				console.error(err);

				setIsLoading(false);
			}
		});
	};

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		if (!(e.target.files && e.target.files[0])) return;

		setImage(e.target.files[0]);
	};

	const handleDelete = () => {
		setImageUrl(undefined);

		onImageChange(null);
	};

	return (
		<>
			<div
				className={twclsx(
					"relative max-w-[24rem] w-full aspect-video rounded-lg bg-dark-grey",
					"transition duration-200",
					error ? "ring-1 ring-custom-red" : "",
					disabled ? "pointer-events-none opacity-40" : "",
					isDragActive ? "bg-custom-green bg-opacity-50" : ""
				)}
			>
				{isLoading ? (
					<div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
						<AiOutlineLoading3Quarters className="w-8 h-8 animate-spin" />
					</div>
				) : imageUrl ? (
					<>
						<button
							className="absolute top-2 right-2 z-20 p-1 rounded-full bg-dark-grey group"
							type="button"
							onClick={handleDelete}
							disabled={disabled}
						>
							<IoMdClose
								className={clsx(
									"w-5 h-5 text-custom-white transition duration-200",
									"group-hover:opacity-80 group-active:opacity-60"
								)}
							/>
						</button>
						<img
							className="absolute left-0 top-0 w-full h-full rounded-lg"
							src={imageUrl}
							alt="file"
						/>
					</>
				) : (
					<p
						className={clsx(
							"absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
							"p-2 w-full text-center text-light-grey lg:text-lg select-none"
						)}
					>
						{isDragActive ? (
							<span className="text-custom-white">Drop it here</span>
						) : (
							<>
								<BsImage className="mx-auto mb-2 w-5 h-5 lg:w-7 lg:h-7" />
								Drag & drop
								<br />
								or <span className="text-custom-green">browse</span>
							</>
						)}
					</p>
				)}
				<label
					className={clsx(
						"absolute left-0 top-0 w-full h-full rounded-lg cursor-pointer",
						error
							? "ring-1 ring-custom-red focus-within:ring-red-600"
							: "focus-within:ring-1 focus-within:ring-custom-green",
						imageUrl ? "hidden" : "block"
					)}
					{...getRootProps()}
				>
					<input
						className="absolute left-0 top-0 w-full h-full opacity-0 pointer-events-none -z-10"
						{...getInputProps({
							id: "file",
							value: "",
							onChange: handleChange,
							onClick: handleDelete,
							multiple: false,
							accept: ".jpg,.jpeg",
							disabled: isLoading || disabled
						})}
					/>
				</label>
			</div>
		</>
	);
};

export default ImageUpload;
