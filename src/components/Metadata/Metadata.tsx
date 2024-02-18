interface IMetadata {
	title: string;
	description: string;
}

export const generateMedatada = ({ title, description }: IMetadata) => {
	return {
		title: title,
		description: description,
	};
};
