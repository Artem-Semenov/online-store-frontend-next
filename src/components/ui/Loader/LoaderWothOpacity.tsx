import Loader from "@/components/ui/Loader/Loader";

const LoaderWothOpacity = () => {
	return (
		<div className="w-full h-full absolute flex justify-center items-center">
			<div className="w-full h-full absolute bg-black bg-opacity-55"></div>
			<div className="relative">
				<Loader size={100} />
			</div>
		</div>
	);
};
export default LoaderWothOpacity;
