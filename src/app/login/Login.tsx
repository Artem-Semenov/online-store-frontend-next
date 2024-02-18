"use client";
import Heading from "@/components/ui/Heading";
import Button from "@/components/ui/button/Button";
import { authEnum } from "@/services/auth/auth.helper";
import { AuthService } from "@/services/auth/auth.service";
import { IEmailPassword } from "@/types/auth.interface";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

type Props = {};
const Login = (props: Props) => {
	const { register, handleSubmit, reset, formState } = useForm<IEmailPassword>({
		mode: "onChange",
	});

	const { isSubmitting } = formState;

	const [type, setType] = useState<authEnum>(authEnum.login);

	const { push } = useRouter();

	const { mutateAsync } = useMutation({
		mutationKey: ["auth"],
		mutationFn: (data: IEmailPassword) => AuthService.main(type, data),
		onSuccess() {
			reset();
			push("/dashboard");
		},
	});

	const onSubmit: SubmitHandler<IEmailPassword> = async data => {
		await mutateAsync(data);
	};

	return (
		<div>
			<Heading className="capitalize">{type}</Heading>
			<form onSubmit={handleSubmit(onSubmit)}>
				<Button disabled={isSubmitting ? true : false} variant="white">
					Auth
				</Button>
			</form>
		</div>
	);
};
export default Login;
