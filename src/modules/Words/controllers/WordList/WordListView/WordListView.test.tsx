import React from "react";
import { render, shallow, ShallowWrapper } from "enzyme";
import { WordListView, WordListItem } from "./index";
import { wordListMock } from "@mocks/wordList.mock";

describe("WordListView markup", () => {
	let wordList: ShallowWrapper = {} as ShallowWrapper;
	const onClick = jest.fn();

	beforeEach(() => {
		wordList = shallow(
			<WordListView onClick={onClick} wordList={wordListMock} />
		);
	});

	it("Has same number of element as in array", () => {
		expect(wordList.find(WordListItem).length).toEqual(wordListMock.length);
	});

	it("match snapshoot", () => {
		expect(
			render(<WordListView onClick={onClick} wordList={wordListMock} />)
		).toMatchSnapshot();
	});
});
