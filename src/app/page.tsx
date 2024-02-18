import Link from "next/link";

export default function Home() {
	return (
		<main className="flex min-h-screen flex-col items-center justify-center p-24">
			<h1 className="text-3xl font-bold  underline">Hello, Next.js!</h1>
			<div className="flex flex-col justify-center items-center">
				<h2>links to different pages</h2>
				<div className="flex flex-row gap-1 justify-center">
					<Link href={"/freeUnAutorizedPage"}>freeUnAutorizedPage</Link>
					<Link href={"/mustBeAutorizedRoute"}>mustBeAutorizedRoute</Link>
				</div>
			</div>
		</main>
	);
}
