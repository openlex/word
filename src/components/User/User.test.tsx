import React from "react";
import { mount, ReactWrapper, render } from "enzyme";
import { User } from "@components";

describe("WordListItem markup", () => {
	let user: ReactWrapper = {} as ReactWrapper;
	const textValue = "text";
	const onClickMock = jest.fn();

	beforeEach(() => {
		user = mount(<User user={textValue} onClick={onClickMock} />);
	});

	it("Click on btn fire click-action", () => {
		user.find('[data-test-id="button"]').simulate("click");
		expect(onClickMock).toHaveBeenCalled();
	});

	it("match snapshoot", () => {
		expect(
			render(<User user={textValue} onClick={onClickMock} />)
		).toMatchSnapshot();
	});
});
