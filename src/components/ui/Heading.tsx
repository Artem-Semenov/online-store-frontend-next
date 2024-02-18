import clsx from "clsx";
import React, { FC, PropsWithChildren } from "react";

interface IHeading {
	className?: string;
}

const Heading: FC<PropsWithChildren<IHeading>> = ({ className, children }) => {
	return (
		<h1 className={clsx(`font-semibold text-3xl`, className)}>{children}</h1>
	);
};
export default Heading;
