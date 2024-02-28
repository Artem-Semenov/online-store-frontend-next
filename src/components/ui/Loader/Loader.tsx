import { Loader as LoaderIcon } from "lucide-react";

type Props = {
	size?: number;
	color?: string;
	className?: string;
};
const Loader = ({ size, color, className }: Props) => {
	return (
		<LoaderIcon
			className={`animate-spin ${className}`}
			color={color || "white"}
		/>
	);
};
export default Loader;
