import * as React from "react";
import { Login, getUserModule } from "@/modules";
import { DynamicModuleLoader } from "redux-dynamic-modules";

export const AuthPage = () => (
	<DynamicModuleLoader modules={[getUserModule()]}>
		<Login />
	</DynamicModuleLoader>
);
