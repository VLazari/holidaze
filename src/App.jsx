import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Venue from "./pages/Venue";

function App() {
	return (
		<Layout>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/venue/:id" element={<Venue />} />
				{/* <Route path="/checkout" element={<Checkout />} />
				<Route path="/contact" element={<Contact />} />
				<Route path="/success" element={<Success />} /> */}
			</Routes>
		</Layout>
	);
}

export default App;
