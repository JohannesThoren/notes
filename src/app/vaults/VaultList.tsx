"use client";

import { vault } from "@prisma/client";
import VaultButton from "./VaultButton";

export default function VaultList(props: { vaults: vault[] }) {
	return (
		<>
			{props.vaults.map((v) => (
				<VaultButton text={v.name} key={v.id} />
			))}
		</>
	);
}
