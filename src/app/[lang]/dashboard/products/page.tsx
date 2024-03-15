import { Metadata } from "next";
import { NO_INDEX_PAGE } from "@/constants/seo.constants";
import Heading from "@/components/ui/Heading";
import { ProductManagement } from "@/app/[lang]/dashboard/products/ProductManagement";
type Props = {};

export const metadata: Metadata = {
	title: "Dashboard",
	...NO_INDEX_PAGE,
};

const Dashboard = (props: Props) => {
	return (
		<div>
			<Heading>Product management</Heading>
			<ProductManagement />
		</div>
	);
};

export default Dashboard;
