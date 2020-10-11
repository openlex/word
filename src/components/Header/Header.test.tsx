import React from "react";
import { mount, ReactWrapper } from "enzyme";
import { Header, User } from "@components";

describe("WordListItem markup", () => {
	let header: ReactWrapper;
	const userName = "Name";
	const onClickMock = jest.fn();

	beforeEach(() => {
		header = mount(<Header username="" onLogOut={onClickMock} />);
	});

	it("no user block if no user", () => {
		expect(header.find('[data-test-id="user"]').length).toBe(0);
	});

	it("user block exist if user in props", () => {
		header.setProps({
			username: userName,
		});
		expect(header.find(User).length).toBe(1);
	});
});
