import Form from "@/components/Form";
import ErrorMessage from "../../components/ErrorMessage";
import Input from "@/components/Input";
import { notFound } from "next/navigation";
import { auth_user } from "@/lib/auth";
import client from "../../../prisma/prismadb";
import { nanoid } from "nanoid";
import { cookies } from "next/headers";
import Submit from "@/components/Submit";

export default function LoginForm() {
	async function auth(fomrData: FormData) {
		"use server";
		const email = fomrData.get("email")?.toString();
		if (!email) notFound();
		const password = fomrData.get("password")?.toString();
		if (!password) notFound();

		const id = await auth_user(email, password);
		const session = nanoid(128);
		const session_expires = new Date(
			new Date().getTime() + 24 * 60 * 60 * 1000
		);

		await client.user.update({
			where: { id: id },
			data: {
				session: session,
				session_expires: session_expires,
			},
		});

		cookies().set("session", session, { expires: session_expires });
	}
	return (
		<Form action={auth}>
			<div>
				<label htmlFor="Email">Email</label>
				<Input
					type="email"
					name="email"
					placeholder="example@web.com"
					required={true}
				/>
			</div>

			<div>
				<label htmlFor="password">Password</label>
				<Input
					type="password"
					name="password"
					placeholder="password"
					required={true}
				/>
			</div>

			<ErrorMessage />

			<div>
				<Submit value={"Login"} />
			</div>
		</Form>
	);
}
