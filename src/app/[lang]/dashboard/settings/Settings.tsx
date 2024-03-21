"use client";
import { useInitialData } from "@/app/[lang]/dashboard/settings/useInitialData";
import { useUpdateProfile } from "@/app/[lang]/dashboard/settings/useUpdateProfile";
import { validEmail } from "@/app/[lang]/login/valid-email";
import { useTranslation } from "@/app/i18n/client";
import { TLanguages } from "@/app/i18n/types";
import Heading from "@/components/ui/Heading";
import Loader from "@/components/ui/Loader/Loader";
import Button from "@/components/ui/button/Button";
import Field from "@/components/ui/input/Field";
import { useLang } from "@/hooks/useLang";
import { IUserUpdateData } from "@/services/user/types/user.types";
import { SubmitHandler, useForm } from "react-hook-form";

export function Settings() {
	const { t } = useTranslation(useLang(), "settings");

	const { register, handleSubmit, reset, formState } = useForm<IUserUpdateData>(
		{
			mode: "onChange",
		},
	);

	const { errors } = formState;

	const { isLoading } = useInitialData(reset);

	const { mutate, isPending } = useUpdateProfile();

	const onSubmit: SubmitHandler<IUserUpdateData> = data => {
		const { password, ...rest } = data;

		mutate({
			...rest,
			password: password || undefined,
		});
	};

	return (
		<div>
			<Heading>
				{t("title")}{" "}
				{isLoading && <Loader className="inline-block" color="gray" />}
			</Heading>
			<div>
				<form action="" onSubmit={handleSubmit(onSubmit)}>
					<div className=" grid grid-cols-2 gap-10">
						<div>
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
								disabled={isLoading}
							/>
							<Field
								{...register("name")}
								type="text"
								placeholder={t("name")}
								disabled={isLoading}
							/>
							<Field
								{...register("password", {
									minLength: {
										value: 4,
										message: "Min length of password - 4 symbols",
									},
								})}
								type="password"
								placeholder={t("password")}
								error={errors.password?.message}
								disabled={isLoading}
							/>
						</div>
						<div>
							<Field
								{...register("phone", {
									pattern: {
										value: new RegExp(/^[0-9)\-\+(]+$/),
										message: "Invalid phone",
									},
								})}
								type="text"
								placeholder={t("phone")}
								error={errors.phone?.message}
								disabled={isLoading}
							/>
						</div>
						<Button type="submit" disabled={isPending} variant="orange">
							{t("save")}
						</Button>
					</div>
				</form>
			</div>
		</div>
	);
}
