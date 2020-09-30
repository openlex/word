import React, { useEffect, useState } from "react";
import { ROUTES } from "@/ROUTES";
import { AuthApi } from "@api";
import { Redirect } from "react-router-dom";
import { LoadingScreen } from "@components";

enum EAuthStatus {
	CHECKING = 0,
	AUTH = 1,
	EMPTY = 2,
}

export const authOnlyHOC = <Props extends object>(
	Component: React.ComponentType<Props>,
	redirectPath: string = ROUTES.auth
) => (props: Props) => {
	const [isAuthorized, setIsAuthorized] = useState<EAuthStatus>(
		EAuthStatus.CHECKING
	);

	useEffect(() => {
		(async () => {
			const isAuthorized = await AuthApi.isLoggedIn();
			setIsAuthorized(
				isAuthorized ? EAuthStatus.AUTH : EAuthStatus.EMPTY
			);
		})();
	}, []);

	if (isAuthorized === EAuthStatus.CHECKING) {
		return <LoadingScreen data-test-id="loading-screen" />;
	}

	return isAuthorized === EAuthStatus.AUTH ? (
		<Component {...props} />
	) : (
		<Redirect to={redirectPath} />
	);
};
