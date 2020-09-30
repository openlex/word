import React from "react";
import { render, shallow, ShallowWrapper } from "enzyme";
import { WordList, WordListItem } from "@components";
import { wordListMock } from "@mocks/wordList.mock";

describe("WordList markup", () => {
	let wordList: ShallowWrapper = {} as ShallowWrapper;
	const onClick = jest.fn();

	beforeEach(() => {
		wordList = shallow(
			<WordList onClick={onClick} wordList={wordListMock} />
		);
	});

	it("Has same number of element as in array", () => {
		expect(wordList.find(WordListItem).length).toEqual(wordListMock.length);
	});

	it("match snapshoot", () => {
		expect(
			render(<WordList onClick={onClick} wordList={wordListMock} />)
		).toMatchSnapshot();
	});
});
