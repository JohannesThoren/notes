import Form from "@/components/Form";
import Input from "@/components/Input";
import { notFound, redirect } from "next/navigation";
import ErrorMessage from "../../components/ErrorMessage";
import client from "../../../prisma/prismadb";
import { genSalt, genSaltSync, hash } from "bcrypt";
import { nanoid } from "nanoid";
import { cookies } from "next/headers";
import Submit from "@/components/Submit";

export default async function RegisterForm() {
	let error_msg: string | undefined = undefined;

	async function register(formData: FormData) {
		"use server";

		const first_name = formData.get("first_name")?.toString();
		if (!first_name) notFound();
		const last_name = formData.get("last_name")?.toString();
		if (!last_name) notFound();
		const email = formData.get("email")?.toString();
		if (!email) notFound();
		const password = formData.get("password")?.toString();
		if (!password) notFound();

		const user = await client.user.findUnique({
			where: { email: formData.get("email")?.toString() },
		});
		if (user != undefined)
			redirect("/register?error=A user with that email already exist! ");

		if (password.length < 8)
			redirect(
				"/register?error=Password needs to be at least 8 characters long!"
			);

		if (password != formData.get("re_type_password"))
			redirect("/register?error=Password does not match");

		console.time("hash");
		const salt = genSaltSync(10);
		const password_hash = await hash(password, salt);
		console.timeEnd("hash");

		const session = nanoid(128);
		const session_expires = new Date(
			new Date().getTime() + 24 * 60 * 60 * 1000
		);

		await client.user.create({
			data: {
				first_name: first_name,
				last_name: last_name,
				email: email,
				password_hash: password_hash,
				password_salt: salt,
				session: session,
				session_expires: session_expires,
			},
		});

		cookies().set("session", session, { expires: session_expires });

		redirect("/login");
	}

	return (
		<Form action={register}>
			<div>
				<label htmlFor="first_name">First Name</label>
				<Input
					type="text"
					name="first_name"
					placeholder="First Name"
					required={true}
				/>
			</div>

			<div>
				<label htmlFor="last_name">Last Name</label>
				<Input
					type="text"
					name="last_name"
					placeholder="Last Name"
					required={true}
				/>
			</div>

			<div>
				<label htmlFor="email">E-Mail</label>
				<Input type="email" name="email" placeholder="example@web.com" />
			</div>

			<div>
				<label htmlFor="Password">Password</label>
				<Input type="password" name="password" placeholder="Password" />
			</div>

			<div>
				<label htmlFor="re_type_password">Re-type Password</label>
				<Input
					type="password"
					name="re_type_password"
					placeholder="Re-type password"
				/>
			</div>

			<ErrorMessage />

			<div>
				<Submit value={"Register"} />
			</div>
		</Form>
	);
}
