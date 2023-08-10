"use client";

import {
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogOverlay,
	AlertDialogRoot,
	AlertDialogTitle,
	AlertDialogTrigger
} from "@/components/AlertDialog";

interface IProps {
	Trigger?: React.ReactNode;
	message?: string;
	description?: string;
	onDelete?: () => void;
	onCancel?: () => void;
}

const DeletionAlert = ({ Trigger, message, description, onDelete, onCancel }: IProps) => (
	<AlertDialogRoot>
		<AlertDialogTrigger asChild>{Trigger}</AlertDialogTrigger>
		<AlertDialogOverlay />
		<AlertDialogContent>
			<AlertDialogTitle>{message || "Are you sure?"}</AlertDialogTitle>
			<AlertDialogDescription className="mt-4">
				{description ||
					"Do you really want to delete this record? This action cannot be undone."}
			</AlertDialogDescription>
			<div className="mt-6 flex items-center gap-x-3">
				<AlertDialogCancel onClick={onCancel}>Cancel</AlertDialogCancel>
				<AlertDialogAction onClick={onDelete}>Delete</AlertDialogAction>
			</div>
		</AlertDialogContent>
	</AlertDialogRoot>
);

export default DeletionAlert;
