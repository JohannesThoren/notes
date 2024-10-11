import { IoMdAdd } from "react-icons/io";

export default function NewVaultButton() {
	return (
		<button className="w-full dark:bg-stone-800 bg-stone-200 rounded-md dark:hover:bg-stone-700 hover:bg-stone-300 text-7xl grid place-content-center">
			<IoMdAdd />
		</button>
	);
}
