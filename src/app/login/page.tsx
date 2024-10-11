import { validate_session } from "@/lib/auth";
import LoginForm from "./LoginForm";
import { redirect } from "next/navigation";

export default async function Page() {
	const user = await validate_session();
	if (user) {
		redirect("/vaults");
	}

	return (
		<>
			<LoginForm />
		</>
	);
}
