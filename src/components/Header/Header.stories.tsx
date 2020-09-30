import React from "react";
import { Header } from "@components";
import { text, withKnobs } from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";

export default {
	title: "Хэдер страницы",
	components: Header,
	decorators: [withKnobs],
};

export const defaultHeader = () => (
	<Header
		user={text("Имя пользователя", "Алексей 555")}
		onLogOut={action("logOut")}
	/>
);

defaultHeader.story = {
	name: "Хэдер для авторизованного пользователя",
};

export const headerLoggedOut = () => (
	<Header user="" onLogOut={action("logOut")} />
);

headerLoggedOut.story = {
	name: "Хэдер для неавторизованного пользователя",
};
