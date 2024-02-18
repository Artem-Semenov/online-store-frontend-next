import { ButtonHTMLAttributes, FC } from "react";
import cn from "clsx";

interface IButton extends ButtonHTMLAttributes<HTMLButtonElement> {
	variant: "white" | "orange";
}

const Button: FC<IButton> = ({ children, className, variant, ...rest }) => {
	return (
		<button
			{...rest}
			className={cn(
				"rounded-xl font-medium shadow px-10 py-2 disabled:bg-aqua",
				{
					"text-white bg-priamry": variant === "orange",
					"text-priamry bg-white": variant === "white",
				},
				className,
			)}
		>
			{children}
		</button>
	);
};
export default Button;
