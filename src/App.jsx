import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";

function App() {
	return (
		<Layout>
			<div>Hello world</div>
			{/* <Routes>
				<Route path="/" element={Home} />
				<Route path="/product/:id" element={<Product />} />
				<Route path="/checkout" element={<Checkout />} />
				<Route path="/contact" element={<Contact />} />
				<Route path="/success" element={<Success />} />
			</Routes> */}
		</Layout>
	);
}

export default App;
