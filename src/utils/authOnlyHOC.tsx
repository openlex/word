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
	const Authenticate: React.FC<{ status: EUserStatus; name: string }> = ({
		status,
		name,
	}) => {
		switch (status) {
			default:
			case EUserStatus.IDLE:
			case EUserStatus.PENDING:
				return <LoadingScreen data-test-id="loading-screen" />;
			case EUserStatus.ERROR:
				return <Redirect to={redirectPath} />;
			case EUserStatus.FULFILL:
				if (name) {
					return <Component />;
				} else {
					return <Redirect to={redirectPath} />;
				}
		}
	};

	const mapStateToProps = ({
		userReducer: {
			status,
			data: { name },
		},
	}: RootReducerType) => ({
		status,
		name,
	});

	return connect(mapStateToProps)(Authenticate);
};
