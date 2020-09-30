import React from "react";
import { mount, ReactWrapper, render } from "enzyme";
import { Header } from "@components";

describe("WordListItem markup", () => {
	let user: ReactWrapper = {} as ReactWrapper;
	const userName = "Name";
	const onClickMock = jest.fn();

	beforeEach(() => {
		user = mount(<Header user="" onLogOut={onClickMock} />);
	});

	it("user block exist if user in props", () => {
		expect(user.find('[data-test-id="user"]').length).toBe(0);
	});

	it("no user block if no user", () => {
		user.setProps({
			user: userName,
		});
		expect(user.find('[data-test-id="user"]').length).toBe(1);
	});

	it("match snapshoot", () => {
		expect(
			render(<Header user="{user: userName}" onLogOut={onClickMock} />)
		).toMatchSnapshot();
	});
});
