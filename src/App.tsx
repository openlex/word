import React, { useCallback, useEffect, useState } from "react";
import { Route, Switch, useLocation } from "react-router-dom";
import { AuthApi } from "@api";
import { Header, LoadingScreen } from "@components";
import { ErrorScreenContainer } from "@containers";
import { AuthPage, MakeWordPage } from "@pages";
import { ROUTES } from "@/ROUTES";
import { Provider } from "react-redux";
import { store } from "@/redux/store";

enum ERespStatus {
	PENDING = 0,
	FULFILL = 1,
	ERROR = 2,
}

export const App: React.FC = () => {
	const location = useLocation();
	const [user, setUser] = useState("");
	const [respStatus, setRespStatus] = useState<ERespStatus | null>(null);
	// const onLogIn = useCallback(async (name: string) => {
	// 	console.log('!');
	// 	// setRespStatus(ERespStatus.PENDING);
	// 	// try {
	// 	// 	await AuthApi.signIn(name);
	// 	// 	setRespStatus(ERespStatus.FULFILL);
	// 	// 	setUser(name);
	// 	// } catch (err) {
	// 	// 	setRespStatus(ERespStatus.ERROR);
	// 	// }
	// }, []);
	const onLogOut = useCallback(async () => {
		setRespStatus(ERespStatus.PENDING);
		try {
			await AuthApi.logOut();
			setRespStatus(ERespStatus.FULFILL);
			setUser("");
		} catch (err) {
			setRespStatus(ERespStatus.ERROR);
		}
	}, []);

	useEffect(() => {
		let isFetch = true;

		AuthApi.fetchUser().then((user) => {
			if (isFetch && user) {
				setUser(user);
			}
		});

		return () => {
			isFetch = false;
			setRespStatus(null);
		};
	}, [user, location.pathname]);

	return (
		<Provider store={store}>
			<ErrorScreenContainer>
				<Header user={user} onLogOut={onLogOut} />
				{respStatus === ERespStatus.PENDING ? (
					<LoadingScreen />
				) : (
					<Switch>
						<Route path={ROUTES.auth} component={AuthPage} />
						<Route path={ROUTES.main} component={MakeWordPage} />
					</Switch>
				)}
			</ErrorScreenContainer>
		</Provider>
	);
};
