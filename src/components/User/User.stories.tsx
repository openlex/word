import React from "react";
import { User } from "@components";
import { text, withKnobs } from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";

export default {
	title: "Пользователь",
	components: User,
	decorators: [withKnobs],
};

export const defaultUser = () => (
	<User
		user={text("Имя пользователя", "Алексей 555")}
		onClick={action("click")}
	/>
);

export const userLongName = () => (
	<User
		user={text(
			"Имя пользователя",
			"Алексей 555@! Шла саша по шоссе 35787 Длинное имя"
		)}
		onClick={action("click")}
	/>
);

userLongName.story = {
	name: "Пользователь с длинным именем",
};
