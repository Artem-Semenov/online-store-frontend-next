"use client";
import { validEmail } from "@/app/login/valid-email";
import Heading from "@/components/ui/Heading";
import Loader from "@/components/ui/Loader/Loader";
import LoaderWothOpacity from "@/components/ui/Loader/LoaderWothOpacity";
import Button from "@/components/ui/button/Button";
import Field from "@/components/ui/input/Field";
import { DASHBOARD_PAGES } from "@/config/pages-url.config";
import { authEnum } from "@/services/auth/auth.helper";
import { AuthService } from "@/services/auth/auth.service";
import { IEmailPassword } from "@/types/auth.interface";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";

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
	const [type, setType] = useState<authEnum>(authEnum.login);
	const { push, replace } = useRouter();

	const { mutate } = useMutation({
		mutationKey: ["auth"],
		mutationFn: (data: IEmailPassword) => AuthService.main(type, data),
		onSuccess() {
			toast.success("Login successful!");
			reset();
			replace(DASHBOARD_PAGES.HOME);
		},
	});

	const { isSubmitting, errors } = formState;

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
					type="email"
					placeholder="Email"
					error={errors.email?.message}
				/>
				<Field
					{...formRegister("password", {
						required: "Password is required",
						minLength: {
							value: 4,
							message: "Min length of password - 4 symbols",
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
