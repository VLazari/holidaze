import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMugSaucer, faSquareParking, faPaw, faWifi } from "@fortawesome/free-solid-svg-icons";

export default function PropertyFeatures(props) {
	const { breakfast, parking, pets, wifi } = props.features;

	return (
		<div className={`mt-10 ${!breakfast && !parking && !pets && !wifi ? "hidden" : ""}`}>
			<h3 className="text-md font-medium">What is included</h3>

			<div className="mt-4">
				<ul className="list-none text-md">
					{breakfast && (
						<li className="text-red-main my-2">
							<FontAwesomeIcon icon={faMugSaucer} className="mx-3 text-2xl" />
							<span className="text-blue-main font-semibold italic">Breakfast</span>
						</li>
					)}
					{parking && (
						<li className="text-red-main my-2">
							<FontAwesomeIcon icon={faSquareParking} className="mx-3 text-2xl" />
							<span className="text-blue-main font-semibold italic">Parking</span>
						</li>
					)}
					{pets && (
						<li className="text-red-main my-2">
							<FontAwesomeIcon icon={faPaw} className="mx-3 text-2xl" />
							<span className="text-blue-main font-semibold italic">Pets allowed</span>
						</li>
					)}
					{wifi && (
						<li className="text-red-main my-2">
							<FontAwesomeIcon icon={faWifi} className="mx-3 text-2xl" />
							<span className="text-blue-main font-semibold italic">Wifi</span>
						</li>
					)}
				</ul>
			</div>
		</div>
	);
}
