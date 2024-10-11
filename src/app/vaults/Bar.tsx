import { user } from "@prisma/client";
import Vaults from "./Vaults";

export default function Bar(props: { user: user }) {
	return (
		<div className="bg-stone-200 dark:bg-stone-800 w-full flex flex-col py-1 px-2 h-fit">
			
			<h1 className="text-lg">{props.user.first_name} {props.user.last_name}</h1>
		</div>
	);
}
