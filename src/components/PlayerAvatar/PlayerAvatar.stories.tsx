import * as React from "react";
import { color, number, text, withKnobs } from "@storybook/addon-knobs";
import { PlayerAvatar } from "@components";

export default {
	title: "Аватар с прогрессбаром",
	components: PlayerAvatar,
	decorators: [withKnobs],
};

export const defaultPlayerAvatar = () => (
	<PlayerAvatar
		size={number("Размер", 70)}
		color={color("Обводки", "green")}
		time={number("Длительность в сек", 60)}
		pic={text("Картинка", "Текст какойто")}
	/>
);
