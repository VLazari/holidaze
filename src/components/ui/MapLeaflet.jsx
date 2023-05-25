import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Icon } from "leaflet";
import MarkerImg from "../../assets/MarkerImg.svg";

export default function MapLeaflet({ venue }) {
	const {
		name,
		media: [image],
		location: { lat, lng },
	} = venue;
	const icon = new Icon({
		iconUrl: MarkerImg,
		iconSize: [30, 30],
	});

	return (
		<MapContainer center={[lat, lng]} zoom={13} scrollWheelZoom={false} className="z-0">
			<TileLayer
				attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
				url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
			/>
			<Marker position={[lat, lng]} icon={icon}>
				<Popup>
					<h2 className="text-blue-main font-semibold">{name}</h2>
					<div className=" mt-2 h-full w-full border">
						<img src={image} alt="Home image" className="h-full w-full object-cover object-center" />
					</div>
				</Popup>
			</Marker>
		</MapContainer>
	);
}
