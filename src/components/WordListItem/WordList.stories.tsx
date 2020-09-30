import React from "react";
import { WordListItem } from "@components";
import { boolean, text, withKnobs } from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";

export default {
	title: "Слово из списка",
	component: WordListItem,
	decorators: [withKnobs()],
};

export const WordListItemView = () => {
	return (
		<WordListItem
			onClick={action("OnClick action")}
			value={text("слово", "Крокодилище")}
			isDifficult={boolean("Является сложным", false)}
		/>
	);
};
