import React from "react";
import { render } from "react-dom";
import "./styles/common.scss";

import { App } from "./App";
import { BrowserRouter as Router } from "react-router-dom";

render(
	<Router>
		<App />
	</Router>,
	document.getElementById("root")
);
