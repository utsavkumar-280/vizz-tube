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
	Nav,
	PhoneNav,
} from "./Components";

function App() {
	return (
		<div className="App">
			<div className="app-container">
				<div className="app-main">
					<Header />
					<Nav />
					<div className="main-routes">
						<Routes>
							<Route path="/" element={<Home />} />
							<Route path="/explore" element={<Explore />} />
							<Route path="/login" element={<Login />} />
							<Route path="/signup" element={<Signup />} />
							<Route path="/forgot-pass" element={<ForgotPassword />} />
							<PrivateRoute path="/liked" element={<Liked />} />
							<PrivateRoute path="/playlist" element={<Playlist />} />
							<PrivateRoute path="/history" element={<History />} />
							<Route path="/not-related" element={<NotRelated />} />
						</Routes>
					</div>

					<Footer />
				</div>
				<PhoneNav />
			</div>
		</div>
	);
}

export default App;
