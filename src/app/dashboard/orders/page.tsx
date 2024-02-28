import type { Metadata } from "next";

import { NO_INDEX_PAGE } from "@/constants/seo.constants";
import { OrdersManagement } from "@/app/dashboard/orders/OrdersManagement";
import Heading from "@/components/ui/Heading";

export const metadata: Metadata = {
	title: "Dasboard | orders",
	...NO_INDEX_PAGE,
};

export default function Page() {
	return (
		<div>
			<div>
				<Heading>Orders Management</Heading>
				<OrdersManagement />
			</div>
		</div>
	);
}
