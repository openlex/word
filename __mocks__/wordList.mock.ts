import { IWordListResponseItem } from "@types";

export const wordListMock = [
	{
		id: "0",
		value: "Text",
	},
	{
		id: "1",
		value: "Text2",
		isDifficult: true,
	},
	{
		id: "2",
		value: "Text3",
	},
	{
		id: "3",
		value: "Text4",
	},
];

export const wordListResponseMock: IWordListResponseItem[] = [
	{
		item: "Warmly",
		weight: 100,
		pos: "adverb",
	},
	{
		item: "Hearty",
		weight: 98,
		pos: "adjective",
	},
	{
		item: "Hospitable",
		weight: 94,
		pos: "adjective",
	},
	{
		item: "Cordial",
		weight: 93,
		pos: "adjective",
	},
	{
		item: "Heartily",
		weight: 85,
		pos: "adverb",
	},
	{
		item: "Greet",
		weight: 84,
		pos: "verb",
	},
];
