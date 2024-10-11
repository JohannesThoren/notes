import { validate_session } from "@/lib/auth";
import Bar from "./Bar";
import { redirect } from "next/navigation";
import { Prisma } from "@prisma/client";
import Vaults from "./Vaults";

export default async function Page() {
	const user = await validate_session();
	if (!user) redirect("/login");
	
	return (
		<main className="h-screen flex flex-col">
			<Bar user={user} />
			<Vaults user={user} />
			{/* <pre>{JSON.stringify(user, null, 2)}</pre>; */}
		</main>
	);
}
