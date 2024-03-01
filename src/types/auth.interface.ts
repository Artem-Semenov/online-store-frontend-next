export interface IEmailPassword {
	email: string;
	password: string;
}

export interface AuthForm extends IEmailPassword {
	name?: string;
	phone?: string;
}
