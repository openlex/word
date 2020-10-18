import React from "react";
import { Route, Switch } from "react-router-dom";
import { ErrorScreen } from "@components";
import { AuthPage, MakeWordPage } from "@pages";
import { ROUTES } from "@/ROUTES";
import { Provider } from "react-redux";
import { store } from "./store";
import { Header } from "@components";

export const App: React.FC = () => {
	return (
		<Provider store={store}>
			<ErrorScreen>
				<Header />
				<Switch>
					<Route path={ROUTES.auth} component={AuthPage} />
					<Route path={ROUTES.main} component={MakeWordPage} />
				</Switch>
			</ErrorScreen>
		</Provider>
	);
};
