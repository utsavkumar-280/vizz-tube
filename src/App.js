import "./App.css";
import { Routes, Route } from "react-router-dom";

import {
	Header,
	Footer,
	Home,
	PrivateRoute,
	Liked,
	Playlist,
	History,
	Explore,
	Login,
	Signup,
	ForgotPassword,
	NotRelated,
} from "./Components";

function App() {
	return (
		<div className="app-container">
			<div className="app-main">
				<Header />
				<Routes>
					<Route to="/" element={<Home />} />
					<Route to="/explore" element={<Explore />} />
					<Route to="/login" element={<Login />} />
					<Route to="/signup" element={<Signup />} />
					<Route to="/forgot-pass" element={<ForgotPassword />} />
					<PrivateRoute to="/liked" element={<Liked />} />
					<PrivateRoute to="/playlist" element={<Playlist />} />
					<PrivateRoute to="/history" element={<History />} />
					<Route to="/not-related" element={<NotRelated />} />
				</Routes>
			</div>
			<Footer />
		</div>
	);
}

export default App;
