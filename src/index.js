import React, { StrictMode } from "react";
import ReactDOM from "react-dom";
import App from "./App";

import { AppDataProvider, AuthProvider } from "./Context";
import { BrowserRouter as Router } from "react-router-dom";

ReactDOM.render(
	<StrictMode>
		<Router>
			<AuthProvider>
				<AppDataProvider>
					<App />
				</AppDataProvider>
			</AuthProvider>
		</Router>
	</StrictMode>,
	document.getElementById("root")
);
