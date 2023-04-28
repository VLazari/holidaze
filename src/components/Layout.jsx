import React from "react";
import Header from "./Header";
import Footer from "./Footer";

function Layout({ children }) {
	return (
		<div className="relative min-h-screen grid grid-rows-[auto,1fr,auto]">
			<Header />
			{children}
			<Footer />
		</div>
	);
}

export default Layout;
