import { UserRole } from "@/types/user.interface";

export interface IEmailPassword {
	email: string;
	password: string;
}

export interface AuthForm extends IEmailPassword {
	name?: string;
	phone?: string;
}

export interface ITokenPayload {
	id: number;
	role: UserRole;
}
