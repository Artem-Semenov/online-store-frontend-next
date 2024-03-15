import { Metadata } from "next";
import { NO_INDEX_PAGE } from "@/constants/seo.constants";
import Heading from "@/components/ui/Heading";
import { Statistics } from "@/app/[lang]/dashboard/Statistics";
type Props = {};

export const metadata: Metadata = {
	title: "Dashboard",
	...NO_INDEX_PAGE,
};

const Dashboard = (props: Props) => {
	return (
		<div>
			<Heading>Dashboard</Heading>
			<Statistics />
		</div>
	);
};

export default Dashboard;
