import { validate_session } from "@/lib/auth";
import Bar from "./Bar";
import { redirect } from "next/navigation";
import Vaults from "./Vaults";
import ErrorDialog from "@/components/ErrorDialog";

export default async function Page() {
	const user = await validate_session();
	if (!user) redirect("/login");
	
	return (
		<main className="h-screen flex flex-col">
			<ErrorDialog  />
			<Bar user={user} />
			<Vaults user={user} />
			{/* <pre>{JSON.stringify(user, null, 2)}</pre>; */}
		</main>
	);
}
