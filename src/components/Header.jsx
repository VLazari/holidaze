import React from "react";
import DropMenu from "./ui/DropMenu";
import { Link } from "react-router-dom";
import Logo from "../assets/Logo.gif";

export default function Header() {
	return (
		<div className="sticky top-0 z-50 flex items-center justify-between px-3 py-3 md:px-6 md:py-5 bg-gradient-to-b from-slate-900 to-blue-main ">
			<Link to="/">
				<img src={Logo} alt="Holidaze logo image" className="max-h-16 p-1" />
			</Link>
			<DropMenu />
		</div>
	);
}
