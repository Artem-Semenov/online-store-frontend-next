import { UserRole } from "@/types/user.interface";

class DASHBOARD {
	private root = "/dashboard";
	HOME = this.root;
	PRODUCTS = this.root + "/products";
	ORDERS = this.root + "/orders";
	SETTINGS = this.root + "/settings";
}

class DASHBOARD_ACCESS {
	HOME = [UserRole.admin, UserRole.manager];
	PRODUCTS = [UserRole.admin, UserRole.manager];
	ORDERS = [UserRole.admin];
	SETTINGS = [UserRole.admin];
}

class CABINET {
	private root = "/cabinet";
	HOME = this.root;
}

class PUBLIC {
	private root = "/";
	HOME = this.root;
	LOGIN = this.root + "login";
	"404" = this.root + "404";
}

export const DASHBOARD_PAGES = new DASHBOARD();
export const CABINET_PAGES = new CABINET();
export const PUBLIC_PAGES = new PUBLIC();
export const DASHBOARD_ACCESS_GROUPS = new DASHBOARD_ACCESS();
