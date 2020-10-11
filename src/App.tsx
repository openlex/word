import React from "react";
import { Route, Switch } from "react-router-dom";
import { ErrorScreenContainer } from "@containers";
import { AuthPage, MakeWordPage } from "@pages";
import { ROUTES } from "@/ROUTES";
import { Provider } from "react-redux";
import { store } from "@/redux/store";
import { HeaderContainer } from "@containers/Header/HeaderContainer";

export const App: React.FC = () => {
	return (
		<Provider store={store}>
			<ErrorScreenContainer>
				<HeaderContainer />
				<Switch>
					<Route path={ROUTES.auth} component={AuthPage} />
					<Route path={ROUTES.main} component={MakeWordPage} />
				</Switch>
			</ErrorScreenContainer>
		</Provider>
	);
};
