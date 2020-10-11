import * as React from "react";
import { useCallback } from "react";
import { useHistory } from "react-router-dom";
import { Header } from "@components";
import { actions as userActions, RootReducerType } from "@rdx";
import { connect } from "react-redux";
import { ROUTES } from "@/ROUTES";

const mapStateToProps = ({ userReducer: user }: RootReducerType) => {
	return {
		username: user.data.name,
	};
};

const mapDispatchToProps = {
	logOut: userActions.remove,
};

type HeaderContainer = ReturnType<typeof mapStateToProps> &
	typeof mapDispatchToProps;

const HeaderBlock: React.FC<HeaderContainer> = ({ username, logOut }) => {
	const history = useHistory();
	const onLogOutClick = useCallback(async () => {
		await logOut();
		history.push(ROUTES.auth);
	}, [history, logOut]);

	return <Header username={username} onLogOut={onLogOutClick} />;
};

export const HeaderContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)(HeaderBlock);
