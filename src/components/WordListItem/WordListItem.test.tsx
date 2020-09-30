import React from "react";
import { render, shallow, ShallowWrapper } from "enzyme";
import { WordListItem } from "@components";

describe("WordListItem markup", () => {
	let wordListItem: ShallowWrapper = {} as ShallowWrapper;
	const textValue = "text";

	beforeEach(() => {
		wordListItem = shallow(<WordListItem value={textValue} />);
	});

	it("Same text as in props", () => {
		expect(wordListItem.find('[data-test-id="value"]').text()).toEqual(
			textValue
		);
	});

	it("Has difficult marker if isDifficult props", () => {
		wordListItem = shallow(
			<WordListItem value={textValue} isDifficult={true} />
		);

		expect(
			wordListItem.find('[data-test-id="isDifficult"]').length
		).toEqual(1);
	});

	it("Has NOT difficult marker if isDifficult props", () => {
		wordListItem.setProps({ isDifficult: false });
		expect(
			wordListItem.find('[data-test-id="isDifficult"]').length
		).toEqual(0);
	});

	it("IS ACTIVE if isActive props", () => {
		wordListItem.setProps({ isActive: true });
		expect(
			wordListItem.find("[data-is-active]").prop("data-is-active")
		).toEqual("true");
	});

	it("IS NOT ACTIVE if has not got isActive props", () => {
		wordListItem.setProps({ isActive: false });
		expect(
			wordListItem.find("[data-is-active]").prop("data-is-active")
		).toEqual("false");
	});

	it("return NULL if VALUE is empty", () => {
		wordListItem = shallow(<WordListItem value="" />);
		expect(wordListItem.type()).toEqual(null);
	});

	it("match snapshoot", () => {
		expect(render(<WordListItem value={textValue} />)).toMatchSnapshot();
	});
});
