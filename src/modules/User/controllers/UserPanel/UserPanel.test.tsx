import React from "react";
import { mount } from "enzyme";
import { UserPanelModule, User } from "@/modules/User";

const mockHistoryPush = jest.fn();

jest.mock("react-router-dom", () => ({
	useHistory: () => ({
		push: mockHistoryPush,
	}),
}));

describe("UserPanel test", () => {
	const logOutFn = jest.fn();

	it("do not render user if no name", () => {
		const userPanelModule = mount(
			<UserPanelModule username="" logOut={logOutFn()} />
		);
		expect(userPanelModule.find(User).length).toBe(0);
	});
	describe("has user", () => {
		const userPanelModule = mount(
			<UserPanelModule username="Username" logOut={logOutFn} />
		);
		const userComp = userPanelModule.find(User);

		it("render user if got name", () => {
			expect(userComp.length).toBe(1);
		});

		it("call logOut in user onClick", async (done) => {
			await userComp.props().onClick();
			expect(logOutFn).toBeCalled();
			expect(mockHistoryPush).toHaveBeenCalledWith("/signIn");
			done();
		}, 3000);
	});
});
