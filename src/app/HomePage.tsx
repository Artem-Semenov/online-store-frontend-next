import Heading from "@/components/ui/Heading";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Home page",
	description: "",
};

export default function HomePage() {
	return (
		<div>
			<Heading>Hello world</Heading>
		</div>
	);
}
