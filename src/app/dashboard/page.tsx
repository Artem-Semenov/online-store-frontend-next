import { Metadata } from "next";
import { NO_INDEX_PAGE } from "@/constants/seo.constants";
type Props = {};

export const metadata: Metadata = {
	title: "Dashboard",
	...NO_INDEX_PAGE,
};

const Dashboard = (props: Props) => {
	return <div>Dashboard</div>;
};

export default Dashboard;
