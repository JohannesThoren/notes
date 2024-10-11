import { validate_session, validate_vault_ownership } from "@/lib/auth";
import { redirect } from "next/navigation";
import Bar from "../Bar";
import client from "../../../../prisma/prismadb";
import NewCategory from "./NewCategory";
import { IoMdAdd } from "react-icons/io";

export default async function Page({ params }: { params: { id: string } }) {
	const user = await validate_session();
	if (!user) redirect("/vaults");

	const vaultId = Number.parseInt(params.id);
	const vault = await validate_vault_ownership(user.id, vaultId);

	const categories = await client.category.findMany({
		where: { vaultId: vaultId },
	});

	return (
		<main className="h-screen flex flex-col">
			<Bar user={user} />
			<div className="py-2 px-2 h-screen">
				<div className="flex justify-between items-center">
					<h2 className="my-2 text-2xl">Categories</h2>
					<NewCategory user={user} vault={vault} />
				</div>

				<div className="flex justify-center gap-2 flex-wrap">
					{categories.map((c) => (
						<div
							key={c.id}
							className="h-[30dvh] lg:w-[20dvw] md:w-[30dvw] w-full dark:bg-stone-800 bg-stone-200 flex flex-col flex-wrap p-2 rounded-md"
						>
							<div className="flex flex-row justify-between">
								<h3 className="text-xl">{c.name}</h3>
								<div className="bg-stone-300 dark:bg-stone-700 text-2xl p-1 rounded-md hover:bg-stone-400 dark:hover:bg-stone-600 cursor-pointer">
									<IoMdAdd />
								</div>
							</div>
							<div></div>
						</div>
					))}
				</div>
			</div>
		</main>
	);
}
