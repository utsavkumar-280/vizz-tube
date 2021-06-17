import { useEffect } from "react";
import axios from "axios";
import { useAppDataContext } from "./Context";
import { VIZZ_API } from "./utils";
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
	Nav,
	PhoneNav,
	VideoDetails,
} from "./Components";

function App() {
	const { dispatch } = useAppDataContext();

	useEffect(() => {
		(async () => {
			try {
				const {
					data: { response },
				} = await axios.get(`${VIZZ_API}/videos`);

				dispatch({ type: "SET_VIDEOS", payload: response });
			} catch (error) {
				console.log(error);
			}
		})();
	}, [dispatch]);
	// console.log(state);
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
							<Route path="/explore/:vidId" element={<VideoDetails />} />
							<Route path="/login" element={<Login />} />
							<Route path="/signup" element={<Signup />} />
							<Route path="/forgot-pass" element={<ForgotPassword />} />
							<PrivateRoute path="/liked" element={<Liked />} />
							<PrivateRoute path="/playlist" element={<Playlist />} />
							<PrivateRoute path="/history" element={<History />} />
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
