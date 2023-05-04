import React from "react";
import DropMenu from "./ui/DropMenu";
import Logo from "../assets/Logo.gif";

function Header() {
	return (
		<div className="flex items-center justify-between px-6 py-4 bg-blue-main">
			<img src={Logo} alt="Holidaze" className="max-h-16 p-1" />
			<div>Menue</div>
			<DropMenu />
		</div>
	);
}

export default Header;
