import React from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/Logo.gif";

function Footer() {
	return (
		<div className="flex items-center justify-between px-6 py-2 opacity-95 bg-blue-main ">
			<Link to="/">
				<img src={Logo} alt="Holidaze" className="max-h-16 p-1" />
			</Link>
		</div>
	);
}

export default Footer;
