import axios from "axios";
import { useEffect } from "react";
import { useLocation } from "react-router";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useAppDataContext, useAuth } from "./Context";
import { VIZZ_API } from "./utils";
import { setupAuthExceptionHandler } from "./utils";
import "./App.css";

import {
	Header,
	Footer,
	Home,
	PrivateRoute,
	Liked,
	Playlists,
	History,
	Explore,
	Login,
	Signup,
	ForgotPassword,
	Nav,
	PhoneNav,
	VideoDetails,
	ErrorPage,
	Profile,
	SearchedVideos,
	PlaylistVideos,
} from "./Components";

function App() {
	const navigate = useNavigate();
	const { pathname, search } = useLocation();
	console.log({ pathname });
	const { dispatch } = useAppDataContext();
	const {
		state: { token },
		logout,
	} = useAuth();

	useEffect(() => {
		setupAuthExceptionHandler(logout, navigate);

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
	}, []);

	useEffect(() => {
		window.scrollTo(0, 0);
	}, [pathname, search]);

	useEffect(() => {
		if (token) {
			(async () => {
				try {
					const {
						data: {
							response: { customPlaylists, historyPlaylist, likedPlaylist },
						},
					} = await axios({
						url: `${VIZZ_API}/playlists`,
						method: "GET",
						headers: {
							Authorization: `Bearer ${token}`,
						},
					});

					dispatch({ type: "SET_PLAYLISTS", payload: customPlaylists });

					dispatch({ type: "SET_LIKED", payload: likedPlaylist });

					dispatch({ type: "SET_HISTORY", payload: historyPlaylist });
				} catch (error) {
					console.error(error);
				}
			})();
		}
	}, [token]);

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

							<PrivateRoute path="/liked" element={<Liked />} />
							<PrivateRoute path="/playlists" element={<Playlists />} />
							<PrivateRoute
								path="/playlists/:playlistId"
								element={<PlaylistVideos />}
							/>
							<PrivateRoute path="/history" element={<History />} />

							<PrivateRoute path="/profile" element={<Profile />} />
							<Route path="/login" element={<Login />} />
							<Route path="/signup" element={<Signup />} />
							<Route path="/forgot-pass" element={<ForgotPassword />} />

							<Route path="/search" element={<SearchedVideos />} />

							<Route path="*" element={<ErrorPage />} />
							<Route path="/error" element={<ErrorPage />} />
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
