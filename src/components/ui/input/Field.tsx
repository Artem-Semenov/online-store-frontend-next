import { IField } from "@/components/ui/input/field.interface";
import clsx from "clsx";
import { forwardRef } from "react";

const Field = forwardRef<HTMLInputElement, IField>(
	(
		{ placeholder, error, className, type = "text", style, Icon, ...rest },
		ref,
	) => {
		return (
			<div className={clsx("mb-4", className)} style={style}>
				<label>
					<span className="block mb-1">
						{Icon && <Icon className="mr-3" />}
						{placeholder}
					</span>
					<input
						ref={ref}
						type={type}
						placeholder={placeholder}
						className={clsx(
							"px-4 py-2 w-full outline-none border border-gray border-solid focus:border-priamry transition placeholder:text-gray rounded-lg",
							{
								"border-red": !!error,
							},
						)}
						{...rest}
					/>
				</label>
				{error && <div className="text-red mt-1 text-sm">{error}</div>}
			</div>
		);
	},
);

export default Field;
