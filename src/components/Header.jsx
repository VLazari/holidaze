import React from "react";
import DropMenu from "./ui/DropMenu";
import { Link } from "react-router-dom";
import Logo from "../assets/Logo.gif";

export default function Header() {
	return (
		<div className="flex items-center justify-between px-6 py-4 bg-blue-main">
			<Link to="/">
				<img src={Logo} alt="Holidaze" className="max-h-16 p-1" />
			</Link>
			<div>Menu</div>
			<DropMenu />
		</div>
	);
}
