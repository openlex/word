import * as React from "react";
import { useCallback } from "react";
import { useHistory } from "react-router-dom";
import { LoadingScreen, RegistrationForm } from "@components";
import { actions as userActions, EUserStatus, RootReducerType } from "@rdx";
import { connect } from "react-redux";
import { ROUTES } from "@/ROUTES";

const mapStateToProps = ({ userReducer: user }: RootReducerType) => {
	return {
		username: user.data.name,
		status: user.status,
	};
};

const mapDispatchToProps = {
	logIn: userActions.add,
};

type RegistrationFormContainer = ReturnType<typeof mapStateToProps> &
	typeof mapDispatchToProps;

const RegistrationFormBlock: React.FC<RegistrationFormContainer> = ({
	logIn,
	status,
}) => {
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

export const RegistrationFormContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)(RegistrationFormBlock);
