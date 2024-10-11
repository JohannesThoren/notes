import { cookies } from "next/headers";
import { notFound, redirect } from "next/navigation";
import client from "../../prisma/prismadb";
import { nanoid } from "nanoid";
import { compare, compareSync } from "bcrypt";

async function validate_session() {
    const session = cookies().get("session")
    if (!session) return null

    const user = await client.user.findUnique({
        where: { session: session.value }
    })

    if (!user) return null

    if (user.session_expires.getTime() < Date.now()) {
        client.user.update({ where: { session: session.value }, data: { session: nanoid(128) } })
        redirect("/login")
    }

    return user
}

async function auth_user(email: string, password: string) {
    const user = await client.user.findUnique({
        where: { email: email }
    })

    if (!user) redirect("/login?error=Wrong Username or Password")

    const hash = user.password_hash;

    if (!await compare(password, hash)) redirect("/login?error=Wrong Username or Password")

    return user.id
}

export { validate_session, auth_user }