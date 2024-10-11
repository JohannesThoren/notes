import { CiVault } from "react-icons/ci";

export default function VaultButton(props: { text: string }) {
	return (
		<div className="w-full dark:bg-stone-800 bg-stone-200 rounded-md dark:hover:bg-stone-700 hover:bg-stone-300  grid place-items-center hover:cursor-pointer">
			<div className="flex flex-col items-center">
				<span className="text-6xl">
					<CiVault />
				</span>
				<p>{props.text}</p>
			</div>
		</div>
	);
}
