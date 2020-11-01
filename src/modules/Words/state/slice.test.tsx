import { EWordsStatus, wordsSlice } from "@/modules";

describe("word slice test", () => {
	const { reducer, actions } = wordsSlice;
	const wordListInner = ["word1", "word2", "word3"];
	const wordListAdapted = wordListInner.map((word) => ({ value: word }));
	const fullState = {
		data: [{ value: "1" }, { value: "2" }, { value: "3" }],
		status: EWordsStatus.IDLE,
	};

	it("fill state", () => {
		expect(
			JSON.stringify(reducer(undefined, actions.fill(wordListInner)))
		).toBe(
			JSON.stringify({
				data: wordListAdapted,
				status: EWordsStatus.FULFILL,
			})
		);
	});

	it("fill existed state", () => {
		expect(
			JSON.stringify(reducer(fullState, actions.fill(wordListInner)))
		).toBe(
			JSON.stringify({
				data: [...fullState.data, ...wordListAdapted],
				status: EWordsStatus.FULFILL,
			})
		);
	});

	it("clean state", () => {
		expect(JSON.stringify(reducer(fullState, actions.clean()))).toBe(
			JSON.stringify({
				data: [],
				status: EWordsStatus.FULFILL,
			})
		);
	});

	it("update state by chosen words", () => {
		const chosenWords = wordListInner;
		const initial = {
			...fullState,
		};
		initial.data = [...initial.data, ...wordListAdapted];

		expect(
			JSON.stringify(reducer(initial, actions.updateChecked(chosenWords)))
		).toBe(
			JSON.stringify({
				data: [
					...fullState.data,
					...wordListAdapted.map((word) => ({
						...word,
						isActive: true,
					})),
				],
				status: EWordsStatus.FULFILL,
			})
		);
	});
});
