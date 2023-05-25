import { useState } from "react";
import { HomeModernIcon, ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";

export default function ImageSlider(props) {
	const { media } = props.venue;
	const [imageIndex, setImageIndex] = useState(0);

	const goToPreviousIndex = () => {
		const newIndex = imageIndex === 0 ? media.length - 1 : imageIndex - 1;
		setImageIndex(newIndex);
	};
	const goToNextIndex = () => {
		const newIndex = imageIndex === media.length - 1 ? 0 : imageIndex + 1;
		setImageIndex(newIndex);
	};
	const goToImageIndex = (newIndex) => {
		setImageIndex(newIndex);
	};

	if (media.length) {
		return (
			<div className="mx-auto mt-6 max-w-3xl sm:px-6 lg:px-8">
				<div className="relative mx-auto mt-6 max-w-2xl sm:px-6 lg:px-8 bg-blue-main/25">
					<div className="absolute top-o left-0 h-full w-1/4 z-10 bg-black/0 cursor-pointer" onClick={goToPreviousIndex}>
						<ChevronLeftIcon className="absolute top-1/2 left-10 h-10 md:h-16 w-6 md:w-12 text-white bg-black/30 rounded" />
					</div>
					<div className="absolute top-o right-0 h-full w-1/4 z-10 bg-black/0 cursor-pointer" onClick={goToNextIndex}>
						<ChevronRightIcon className="absolute top-1/2 right-10 h-10 md:h-16 w-6 md:w-12 text-white bg-black/30 rounded" />
					</div>
					<div className="aspect-h-4 aspect-w-6 lg:aspect-h-2 lg:aspect-w-3 sm:overflow-hidden sm:rounded-lg">
						<img src={media[imageIndex]} alt="Home image" className="h-full w-full object-contain object-center" />
					</div>
				</div>
				<div className="flex justify-center flex-wrap">
					{media.map((img, index) => (
						<div key={index} className="mx-2 mt-2 h-14 w-14 border cursor-pointer" onClick={() => goToImageIndex(index)}>
							<img src={img} alt="Home image" className="h-full w-full object-cover object-center" />
						</div>
					))}
				</div>
			</div>
		);
	} else {
		return (
			<div className="mx-auto mt-6 max-w-3xl sm:px-6 lg:px-8">
				<div className="relative mx-auto mt-6 max-w-2xl sm:px-6 lg:px-8 bg-blue-main/25">
					<div className="aspect-h-4 aspect-w-6 lg:aspect-h-2 lg:aspect-w-3 sm:overflow-hidden sm:rounded-lg">
						<HomeModernIcon className="h-full w-full object-contain object-center" />
					</div>
				</div>
				<div className="flex justify-center flex-wrap">
					<div className="mx-2 mt-2 h-14 w-14 border cursor-pointer" onClick={() => goToImageIndex(index)}>
						<HomeModernIcon className="h-full w-full object-contain object-center" />
					</div>
				</div>
			</div>
		);
	}
}
