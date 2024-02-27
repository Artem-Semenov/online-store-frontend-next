import { Loader as LoaderIcon } from "lucide-react";

type Props = {
	size?: number;
	color?: string;
};
const Loader = ({ size, color }: Props) => {
	return <LoaderIcon className="animate-spin" color={color || "white"} />;
};
export default Loader;
