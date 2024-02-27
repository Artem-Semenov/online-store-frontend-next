class DASHBOARD {
	private root = "/dashboard";
	HOME = this.root;
	PRODUCTS = this.root + "/products";
	ORDERS = this.root + "/orders";
}

class PUBLIC {}

export const DASHBOARD_PAGES = new DASHBOARD();
export const PUBLIC_PAGES = new PUBLIC();
