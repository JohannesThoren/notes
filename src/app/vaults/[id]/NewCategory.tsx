"use server";

import Dialog from "@/components/Dialog";
import Form from "@/components/Form";
import Input from "@/components/Input";
import Submit from "@/components/Submit";
import { user, vault } from "@prisma/client";
import { IoMdAdd } from "react-icons/io";
import client from "../../../../prisma/prismadb";
import { notFound, redirect } from "next/navigation";

export default async function NewCategory(props: { user: user; vault: vault }) {
	async function newVault(formData: FormData) {
		"use server";

		const name = formData.get("category_name")?.toString();
		if (!name) notFound();

		const category = await client.category.create({
			data: {
				name: name,
				vaultId: props.vault.id,
			},
		});

		redirect(`/vaults/${props.vault.id}`);
	}

	return (
		<Dialog
			button={
				<div className="px-2 py-2 text-2xl rounded-md bg-stone-200 dark:bg-stone-800 hover:bg-stone-300 dark:hover:bg-stone-700 cursor-pointer">
					<IoMdAdd />
				</div>
			}
		>
			<Form action={newVault}>
				<div>
					<Input placeholder="Category Name" name="category_name"></Input>
				</div>
				<div className="">
					<Submit value={"Create Category"} />
				</div>
			</Form>
		</Dialog>
	);
}
