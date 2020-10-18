import * as React from "react";
import { useCallback } from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { ROUTES } from "@/ROUTES";
import { userSlice } from "@modules/User";
import { RootReducerType } from "@/store";
import { User } from "./User";

const mapStateToProps = ({ user }: RootReducerType) => {
	return {
		username: user.data.name,
	};
};

const mapDispatchToProps = {
	logOut: userSlice.actions.remove,
};

type UserPanelModule = ReturnType<typeof mapStateToProps> &
	typeof mapDispatchToProps;

export const UserPanelModule: React.FC<UserPanelModule> = ({
	username,
	logOut,
}) => {
	const history = useHistory();
	const onLogOutClick = useCallback(async () => {
		await logOut();
		history.push(ROUTES.auth);
	}, [history, logOut]);

	if (!username) {
		return null;
	}

	return <User user={username} onClick={onLogOutClick} />;
};

export const UserPanel = connect(
	mapStateToProps,
	mapDispatchToProps
)(UserPanelModule);
