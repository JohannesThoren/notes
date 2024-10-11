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
		<div className="py-2 px-2 h-screen">
			<div className="flex justify-between items-center">
				<h2 className="my-2 text-2xl">Vaults</h2>
				<NewVault user={props.user} />
			</div>

			<div className="flex justify-center gap-2 flex-wrap">
				<VaultList vaults={vaults} />
			</div>
		</div>
	);
}
