import React from "react";
import { ROUTES } from "@/ROUTES";
import { Redirect } from "react-router-dom";
import { LoadingScreen } from "@components";
import { EUserStatus, RootReducerType } from "@rdx";
import { connect } from "react-redux";

export const authOnlyHOC = <Props extends object>(
	Component: React.ComponentType,
	redirectPath: string = ROUTES.auth
) => {
	const Authenticate: React.FC<{ status: EUserStatus }> = ({ status }) => {
		switch (status) {
			default:
			case EUserStatus.IDLE:
				return <Redirect to={redirectPath} />;
			case EUserStatus.PENDING:
				return <LoadingScreen data-test-id="loading-screen" />;
			case EUserStatus.FULFILL:
				return <Component />;
		}
	};

	const mapStateToProps = ({ userReducer: { status } }: RootReducerType) => ({
		status,
	});

	return connect(mapStateToProps)(Authenticate);
};
