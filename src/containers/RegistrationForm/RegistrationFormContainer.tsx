import * as React from "react";
import { useCallback } from "react";
import { useHistory } from "react-router-dom";
import { LoadingScreen, RegistrationForm } from "@components";
import { IRootReducer, logIn } from "@/redux";
import { connect } from "react-redux";
import { ROUTES } from "@/ROUTES";

const mapStateToProps = ({ user }: IRootReducer) => {
	return {
		user,
		username: user.name,
		isLoading: user.isLoading,
	};
};

const mapDispatchToProps = {
	addUser: logIn,
};

type RegistrationFormContainer = ReturnType<typeof mapStateToProps> &
	typeof mapDispatchToProps;

const RegistrationFormBlock: React.FC<RegistrationFormContainer> = ({
	addUser,
	isLoading,
}) => {
	const history = useHistory();
	const onLogInClick = useCallback(
		async (userName: string) => {
			await addUser({ name: userName });
			history.push(ROUTES.main);
		},
		[history, addUser]
	);

	return isLoading ? (
		<LoadingScreen data-test-id="loading-screen" />
	) : (
		<RegistrationForm onLogIn={onLogInClick} />
	);
};

export const RegistrationFormContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)(RegistrationFormBlock);
