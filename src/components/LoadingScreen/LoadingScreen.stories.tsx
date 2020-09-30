import React from "react";
import { LoadingScreen } from "@components";

export default {
	title: "Экран загрузки",
	components: LoadingScreen,
};

export const defaultLoadingScreen = () => <LoadingScreen />;
