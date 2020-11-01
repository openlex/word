import * as React from "react";
import { useCallback } from "react";
import { useHistory } from "react-router-dom";
import { LoadingScreen } from "@/components";
import { connect } from "react-redux";
import { ROUTES } from "@/ROUTES";
import { userSlice, EUserStatus } from "@/modules/User";
import { RootReducerType } from "@/store";
import { RegistrationForm } from "./RegistrationForm";

const mapStateToProps = ({ user }: RootReducerType) => {
	return {
		username: user.data.name,
		status: user.status,
	};
};

const mapDispatchToProps = {
	logIn: userSlice.actions.add,
};

type Login = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;

export const LoginModule: React.FC<Login> = ({ logIn, status }) => {
	const history = useHistory();
	const onLogInClick = useCallback(
		async (userName: string) => {
			await logIn({ name: userName });
			history.push(ROUTES.main);
		},
		[history, logIn]
	);

	return status === EUserStatus.PENDING ? (
		<LoadingScreen data-test-id="loading-screen" />
	) : (
		<RegistrationForm onLogIn={onLogInClick} />
	);
};

export const Login = connect(mapStateToProps, mapDispatchToProps)(LoginModule);
