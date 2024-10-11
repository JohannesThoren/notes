"use client";

import { vault } from "@prisma/client";
import Link from "next/link";
import { CiVault } from "react-icons/ci";

export default function name(params: { vault: vault }) {
	return (
		<Link
			key={params.vault.id}
			className="w-[45dvw] h-[45dvw] md:w-[30dvw] md:h-[30dvw] lg:w-[10dvw] lg:h-[10dvw] bg-stone-200 dark:bg-stone-800 rounded-md grid place-items-center dark:hover:bg-stone-700 hover:bg-stone-300 cursor-pointer block"
			href={`/vaults/${params.vault.id}`}
		>
			<div className="grid place-items-center">
				<span className="text-5xl text-center">
					<CiVault />
				</span>
				<p>{params.vault.name}</p>
			</div>
		</Link>
	);
}
