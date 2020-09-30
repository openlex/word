import * as React from "react";
import { color, number, text, withKnobs } from "@storybook/addon-knobs";
import { ProgressCircle } from "@components";

export default {
	title: "ui/Круг с прогрессбаром",
	components: ProgressCircle,
	decorators: [withKnobs],
};

export const defaultProgressCircle = () => (
	<ProgressCircle
		size={number("Размер", 100)}
		progress={number("Процент заполненности", 33)}
		strokeWidth={number("Толщина обводки", 10)}
		strokeColor={color("Обводки", "red")}
		backStrokeColor={color("Фон обводки", "pink")}
	>
		{text("Содержимое (текст)", "Текст какойто")}
	</ProgressCircle>
);

export const emptyBlue = () => (
	<ProgressCircle
		size={200}
		progress={57}
		strokeWidth={25}
		strokeColor="#79E4DA"
		backStrokeColor="#cdd0cf"
	/>
);

emptyBlue.story = {
	name: "Голубой круг без текста",
};
