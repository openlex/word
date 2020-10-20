import React from "react";
import { WordListView } from "./";
import { object, withKnobs } from "@storybook/addon-knobs";
import { IWord } from "@types";
import { action } from "@storybook/addon-actions";

export default {
	title: "Спиок слов",
	component: WordListView,
	decorators: [withKnobs()],
};

export const WordList = () => {
	const defaultWordList: IWord[] = [
		{
			id: "a",
			value: "Дом",
		},
		{
			id: "b",
			value: "Калитка",
			isDifficult: true,
		},
	];

	return (
		<WordListView
			wordList={object("Список слов", defaultWordList)}
			onClick={action("onClick")}
		/>
	);
};
