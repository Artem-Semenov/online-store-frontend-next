"use client";
import { validEmail } from "@/app/login/valid-email";
import Heading from "@/components/ui/Heading";
import Button from "@/components/ui/button/Button";
import Field from "@/components/ui/input/Field";
import { authEnum } from "@/services/auth/auth.helper";
import { AuthService } from "@/services/auth/auth.service";
import { IEmailPassword } from "@/types/auth.interface";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

type Props = {};
const Login = (props: Props) => {
	const {
		register: formRegister,
		handleSubmit,
		reset,
		formState,
	} = useForm<IEmailPassword>({
		mode: "onChange",
	});

	const { isSubmitting, errors } = formState;

	const [type, setType] = useState<authEnum>(authEnum.login);

	const { push } = useRouter();

	const { mutate } = useMutation({
		mutationKey: ["auth"],
		mutationFn: (data: IEmailPassword) => AuthService.main(type, data),
		onSuccess() {
			reset();
			push("/dashboard");
		},
	});

	const onSubmit: SubmitHandler<IEmailPassword> = async data => {
		mutate(data);
	};

	return (
		<section className="flex h-screen">
			<form
				onSubmit={handleSubmit(onSubmit)}
				className="bg-white rounded-lg shadow-sm p-8 m-auto"
			>
				<Heading className="capitalize text-center mb-3">{type}</Heading>
				<Field
					{...formRegister("email", {
						required: "Email is required",
						pattern: {
							value: validEmail,
							message: "Please enter valid email",
						},
					})}
					placeholder="Email"
					error={errors.email?.message}
				/>
				<Field
					{...formRegister("password", {
						required: "Password is required",
						minLength: {
							value: 6,
							message: "Min length of password - 6 symbols",
						},
					})}
					type="password"
					placeholder="Password"
					error={errors.password?.message}
				/>
				<Button
					disabled={isSubmitting ? true : false}
					variant="white"
					className="block mx-auto"
				>
					Login
				</Button>
			</form>
		</section>
	);
};
export default Login;
