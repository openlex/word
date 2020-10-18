import React from "react";
import { mount } from "enzyme";
import { RegistrationForm } from "./";

describe("markup", () => {
	const onClickMock = jest.fn();

	it("match Snapshot", () => {
		expect(
			mount(<RegistrationForm onLogIn={onClickMock} />)
		).toMatchSnapshot();
	});
});
