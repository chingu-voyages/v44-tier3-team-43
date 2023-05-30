"use client";

import Image from "next/image";
import { DropdownContent, DropdownRoot, DropdownTrigger } from "@/components/Dropdown";
import { DropdownMenuItem } from "@radix-ui/react-dropdown-menu";
import Button from "./Button";
import { signOut } from "next-auth/react";

interface IProps {
	name: string;
	image: string;
}

const User = ({ name, image }: IProps) => {
	const handleSignOut = async () => {
		await signOut();
	};

	return (
		<DropdownRoot modal={false}>
			<DropdownTrigger>
				<Image
					className="rounded-full"
					width={36}
					height={36}
					src={image}
					alt={name}
				/>
			</DropdownTrigger>
			<DropdownContent className="flex flex-col items-center" align="end">
				<div className="absolute right-2.5 -top-1 w-2 h-2 bg-inherit -rotate-45 origin-top-right"></div>
				<p className="max-w-[14rem] overflow-hidden text-ellipsis text-center whitespace-nowrap leading-relaxed">
					Welcome,
					<br />
					{name}!
				</p>
				<DropdownMenuItem className="mt-3">
					<Button onClick={handleSignOut}>Sign out</Button>
				</DropdownMenuItem>
			</DropdownContent>
		</DropdownRoot>
	);
};

export default User;
