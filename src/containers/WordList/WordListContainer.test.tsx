import React from "react";
import { shallow, ShallowWrapper } from "enzyme";
import { WordListContainer } from "@containers";
import { wordListMock, wordListResponseMock } from "@mocks/wordList.mock";
import { IWord } from "@types";

describe("WordListItemContainer", () => {
	let wordListItem: ShallowWrapper<{}, {}, WordListContainer>;
	let instance: WordListContainer;

	beforeEach(() => {
		wordListItem = shallow(<WordListContainer />);
		instance = wordListItem.instance();
	});

	it("button should be disable if isSendEnabled - false", () => {
		wordListItem.setState({
			isSendEnabled: false,
		});
		wordListItem.update();
		expect(
			wordListItem.find('[data-test-id="submitBtn"]').prop("disabled")
		).toEqual(true);
	});

	it("button should be enabled if isSendEnabled - true", () => {
		wordListItem.setState({
			isSendEnabled: true,
		});
		wordListItem.update();
		expect(
			wordListItem.find('[data-test-id="submitBtn"]').prop("disabled")
		).toEqual(false);
	});

	it("should check `componentDidMount()`", () => {
		jest.spyOn(instance, "onWordClick"); // You spy on the randomFunction
	});

	it("fetchWordList fire in componentDidMount", async () => {
		jest.mock("./WordListContainer");
		const fetchAction = jest.spyOn(instance, "fetchWordList"); // You spy on the randomFunction

		if (instance) {
			instance.componentDidMount?.();

			expect(fetchAction).toHaveBeenCalled();
		}
	});

	it("test getAdaptWordList is right", () => {
		const wordList = instance.getAdaptWordList(wordListResponseMock);

		expect(wordList[0].id).toEqual(wordListResponseMock[0].item);
		expect(wordList[0].value).toEqual(wordListResponseMock[0].item);
		expect(wordList[0].isDifficult).toEqual(
			wordListResponseMock[0].weight < 30
		);
	});
});

describe("WordListItemContainer button enable status", () => {
	// Тесты должны идти по очереди! Так как в каждом меняется стэйт и дальше это проверяется
	const wordListItem: ShallowWrapper<{}, {}, WordListContainer> = shallow(
		<WordListContainer />
	);
	const instance: WordListContainer = wordListItem.instance();
	const mock = wordListMock;
	wordListItem.setState({
		wordList: mock,
	});

	it("before clicking words", async () => {
		expect(wordListItem.state("isSendEnabled")).toEqual(false);
	});

	it("after clicking first word", async () => {
		// клик по первому элементу - кнопка должна быть неактивна
		instance.onWordClick(mock[0].id);
		expect(wordListItem.state("isSendEnabled")).toEqual(false);
	});

	it("clicking two words", async () => {
		// клик по второму элементу - кнопка должна стать активной
		instance.onWordClick(mock[1].id);
		expect(wordListItem.state("isSendEnabled")).toEqual(true);
	});

	it("clicking three words", async () => {
		// клик по третьему элементу - кнопка должна быть активной
		instance.onWordClick(mock[2].id);
		expect(wordListItem.state("isSendEnabled")).toEqual(true);
	});

	it("clicking back last two words", async () => {
		// клик по третьему элементу - кнопка должна стать НЕактивной
		instance.onWordClick(mock[1].id);
		instance.onWordClick(mock[2].id);

		expect(wordListItem.state("isSendEnabled")).toEqual(false);
	});

	it("click on word is putting its ID in state", () => {
		wordListItem.setState({
			wordList: mock,
		});

		instance.onWordClick(mock[3].id);
		const wordListState: IWord[] = wordListItem.state("wordList");
		expect(wordListState[3].isActive).toEqual(true);
	});
});
