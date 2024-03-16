"use client";
import { errorCatch } from "@/api/api.helper";
import AfterSuccessLogin from "@/app/[lang]/login/AfterSuccessLogin";
import { RevalidateDashboard } from "@/app/[lang]/login/RevalidateDashboard";
import { useSignInGoogleWindow } from "@/app/[lang]/login/useSignInGoogleWindow/useSignInGoogleWindow";
import { validEmail } from "@/app/[lang]/login/valid-email";
import { TLanguages } from "@/app/i18n/types";
import Heading from "@/components/ui/Heading";
import Loader from "@/components/ui/Loader/Loader";
import Button from "@/components/ui/button/Button";
import ButtonLink from "@/components/ui/button/ButtonLink";
import { GoogleButton } from "@/components/ui/button/GoogleButton";
import Field from "@/components/ui/input/Field";
import { DASHBOARD_PAGES } from "@/config/pages-url.config";
import { authEnum } from "@/services/auth/auth.helper";
import { AuthService } from "@/services/auth/auth.service";
import { AuthForm } from "@/types/auth.interface";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { Suspense, SyntheticEvent, useRef, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";

type Props = {
	lang: TLanguages;
};
const Login = ({ lang }: Props) => {
	const { register, handleSubmit, reset, formState, unregister, watch } =
		useForm<AuthForm>({
			mode: "onChange",
			shouldUnregister: false,
		});
	const [type, setType] = useState<authEnum>(authEnum.login);
	const { replace, refresh } = useRouter();

	const [isSuccesRegister, setIsSuccessRegister] = useState<boolean>(false);
	const { mutate, isPending } = useMutation({
		mutationKey: ["auth"],
		mutationFn: (data: AuthForm) => AuthService.main(type, data),
		onSuccess() {
			if (type === authEnum.login) {
				reset();
				onSuccessfulLogin();
			} else if (type === authEnum.register) {
				toast.success("На вашу пошту було відправлено лист із підтвердженням!");
				setIsSuccessRegister(true);
				reset();
			}
		},
		onError: error => {
			toast.error(errorCatch(error));
		},
	});

	const { errors } = formState;

	const onSubmit: SubmitHandler<AuthForm> = async data => {
		mutate(data);
	};

	const onChangeTypeClick = (e: SyntheticEvent) => {
		e.preventDefault();
		setType(type === authEnum.login ? authEnum.register : authEnum.login);
	};

	const onSuccessfulLogin = async () => {
		console.log("onSuccessfulLogin call");
		replace(`/${lang}${DASHBOARD_PAGES.HOME}`);
		toast.success("Успішний вхід в систему");
	};

	const gogleLoginHandler = (e: SyntheticEvent) => {
		console.log("gogleLoginHandler call");

		e.preventDefault();
		useSignInGoogleWindow({
			url: `${process.env.SERVER_URL}/auth/google/callback`,
			name: "Login with google",
			onSuccessfulLogin,
		});
	};

	return (
		<section className="flex h-screen">
			<Suspense>
				<RevalidateDashboard />
				<AfterSuccessLogin />
			</Suspense>
			{isSuccesRegister ? (
				<div className="flex m-auto">
					Registration Successful! Check your email
				</div>
			) : (
				<form
					onSubmit={handleSubmit(onSubmit)}
					className="bg-white rounded-lg shadow-sm p-8 m-auto"
				>
					<Heading className="capitalize text-center mb-3">{type}</Heading>

					<GoogleButton onclick={gogleLoginHandler} />

					<Field
						{...register("email", {
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
						{...register("password", {
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

					{type === authEnum.register && (
						<>
							<Field
								{...register("name", {
									required: "Name is required",
									minLength: {
										value: 1,
										message: "Name is required",
									},
								})}
								type="text"
								placeholder="Name"
								error={errors.name?.message}
							/>
							<Field
								{...register("phone", {
									required: "Phone is required",
									minLength: {
										value: 10,
										message: "Phone should be 10 minimum 10 charachters long",
									},
								})}
								type="text"
								placeholder="Phone"
								error={errors.phone?.message}
							/>
						</>
					)}
					{isPending ? (
						<div className="flex justify-center items-center">
							<Loader color="black" />
						</div>
					) : (
						<Button variant="white" className="block mx-auto" type="submit">
							{type === authEnum.login ? "Login" : "Create account"}
						</Button>
					)}
					<div className="flex justify-center mt-2">
						<ButtonLink onClick={onChangeTypeClick}>
							{type === authEnum.login ? "Sign Up" : "Sign In"}
						</ButtonLink>
					</div>
				</form>
			)}
		</section>
	);
};
export default Login;
