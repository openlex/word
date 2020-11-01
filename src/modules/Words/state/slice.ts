import { createSlice } from "@reduxjs/toolkit";
import { IWord } from "../index";

interface IWordsState {
	data: IWord[];
	status: EWordsStatus;
}

export enum EWordsStatus {
	IDLE = 0,
	PENDING = 1,
	FULFILL = 2,
	ERROR = 3,
}

export const initialWordsState: IWordsState = {
	data: [],
	status: EWordsStatus.IDLE,
};

export const wordsSlice = createSlice({
	name: "words",
	initialState: initialWordsState,
	reducers: {
		fill: (state, action: { payload: string[] }) => {
			const wordList = action.payload.map((word) => ({ value: word }));
			state.data = [...state.data, ...wordList];
			state.status = EWordsStatus.FULFILL;
			// return state;
		},
		clean: (state) => {
			state.data = [];
			state.status = EWordsStatus.FULFILL;
		},
		updateChecked: (state, action: { payload: string[] }) => {
			state.data = state.data.map((word: IWord) => ({
				...word,
				isActive: action.payload.includes(word.value) || undefined,
			}));
			state.status = EWordsStatus.FULFILL;
		},
	},
});
