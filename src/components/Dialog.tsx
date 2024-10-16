"use client";

import { useState } from "react";

export default function Dialog({
	children,
	button,
	
}: {
	children: React.ReactNode;
	button: React.ReactNode;
}) {
	const [open, setOpen] = useState(false);

	return (
		<>
			<div
				onClick={() => {
					setOpen(true);
				}}
			>
				{button}
			</div>
			{open && (
				<div
					id="backdrop"
					className="fixed z-50 inset-0 bg-black/10 backdrop-blur grid place-items-center"
				>
					<div className="flex flex-col">
						<button
							className="py-1 px-2 dark:bg-stone-800 rounded-md bg-stone-200 my-2 w-fit ml-auto"
							onClick={() => {
								setOpen(false);
							}}
						>
							Close
						</button>
						{children}
					</div>
				</div>
			)}
		</>
	);
}
