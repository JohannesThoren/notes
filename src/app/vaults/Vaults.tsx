import { user } from "@prisma/client";
import client from "../../../prisma/prismadb";
import VaultList from "./VaultList";
import Dialog from "@/components/Dialog";
import Input from "@/components/Input";
import Form from "@/components/Form";
import NewVaultButton from "./NewVautlButton";
import Submit from "@/components/Submit";
import { notFound, redirect } from "next/navigation";
import NewVault from "./NewVault";

export default async function Vaults(props: { user: user }) {
	let vaults = await client.vault.findMany({
		where: { userId: props.user.id },
	});

	vaults = vaults.reverse().sort();

	return (
		<div className="py-2 px-2">
			<h2 className="my-2 text-2xl">Vaults</h2>
			<div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-9 justify-items-center gap-3">
				<NewVault user={props.user} />
				<VaultList vaults={vaults} />
			</div>
		</div>
	);
}
