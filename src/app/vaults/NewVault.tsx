"use server";

import Dialog from "@/components/Dialog";
import Form from "@/components/Form";
import NewVaultButton from "./NewVautlButton";
import Input from "@/components/Input";
import Submit from "@/components/Submit";
import { notFound, redirect } from "next/navigation";
import { user } from "@prisma/client";
import client from "../../../prisma/prismadb";
import { revalidatePath } from "next/cache";
import { IoMdAdd } from "react-icons/io";

export default async function NewVault(props: { user: user }) {
	async function newVault(formData: FormData) {
		"use server";
		const vaultName = formData.get("vault_name")?.toString();
		if (!vaultName) notFound();

		await client.vault.create({
			data: {
				name: vaultName,
				userId: props.user.id,
			},
		});

		revalidatePath("/vaults");
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
					<Input placeholder="Vault Name" name="vault_name"></Input>
				</div>
				<div className="">
					<Submit value={"Create Vault"} />
				</div>
			</Form>
		</Dialog>
	);
}
