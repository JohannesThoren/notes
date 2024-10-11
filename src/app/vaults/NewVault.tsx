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
				<div>
					<NewVaultButton />
				</div>
			}
		>
			<Form action={newVault}>
				<div>
					<Input placeholder="Vault Name" name="vault_name"></Input>
				</div>
				<div>
					<Submit value={"Create Vault"} />
				</div>
			</Form>
		</Dialog>
	);
}
