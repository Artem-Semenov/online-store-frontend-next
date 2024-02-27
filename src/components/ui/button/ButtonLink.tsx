import { ButtonHTMLAttributes, FC } from "react";
import cn from "clsx";

interface IButton extends ButtonHTMLAttributes<HTMLButtonElement> {}

const ButtonLink: FC<IButton> = ({ children, className, ...rest }) => {
	return (
		<button
			{...rest}
			className={cn(
				"font-medium text-gray hover:text-black transition-colors duration-300",
				className,
			)}
		>
			{children}
		</button>
	);
};
export default ButtonLink;
