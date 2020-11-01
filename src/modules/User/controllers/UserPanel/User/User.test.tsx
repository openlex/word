import React from "react";
import { shallow, ShallowWrapper } from "enzyme";
import { User } from "./User";

describe("User", () => {
	let user: ShallowWrapper = {} as ShallowWrapper;
	const textValue = "text";
	const onClickMock = jest.fn();

	beforeEach(() => {
		user = shallow(<User user={textValue} onClick={onClickMock} />);
	});

	it("Click on btn fire click-action", () => {
		user.find('[data-test-id="button"]').simulate("click");
		expect(onClickMock).toHaveBeenCalled();
	});

	it("Has user name as in props", () => {
		expect(user.find('[data-test-id="username"]').text()).toBe(textValue);
	});
});
