import React from "react";
import { WordListItem } from "./";
import { IWord } from "@/types";

export interface IWordListProps {
	wordList: IWord[];
	onClick(id: string): void;
}

export const WordListView: React.FC<IWordListProps> = (
	props: IWordListProps
) => {
	return (
		<ul>
			{props.wordList.map(({ id, value, isDifficult, isActive }) => {
				const onClick = () => {
					props.onClick(id);
				};

				return (
					<WordListItem
						key={id}
						onClick={onClick}
						value={value}
						isDifficult={isDifficult}
						isActive={isActive}
					/>
				);
			})}
		</ul>
	);
};
