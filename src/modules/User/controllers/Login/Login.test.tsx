import { EUserStatus, LoginModule } from "@modules";
import { mount } from "enzyme";
import React from "react";
import { RegistrationForm } from "./RegistrationForm";
import { LoadingScreen } from "@components";

describe("test Login", () => {
	const loginFn = jest.fn();

	jest.mock("react-router-dom", () => ({
		useHistory: function useHistory() {
			return {
				push: (url: string) => {
					return url;
				},
			};
		},
	}));

	it("render LoadingScreen while pending status", () => {
		const loginModule = mount(
			<LoginModule
				username=""
				status={EUserStatus.PENDING}
				logIn={loginFn()}
			/>
		);
		expect(loginModule.find(RegistrationForm).length).toBe(0);
		expect(loginModule.find(LoadingScreen).length).toBe(1);
	});

	it("render RegistrationForm while FULFILL status", () => {
		const loginModule = mount(
			<LoginModule
				username=""
				status={EUserStatus.FULFILL}
				logIn={loginFn()}
			/>
		);
		expect(loginModule.find(RegistrationForm).length).toBe(1);
		expect(loginModule.find(LoadingScreen).length).toBe(0);
	});
	it("render RegistrationForm while ERROR status", () => {
		const loginModule = mount(
			<LoginModule
				username=""
				status={EUserStatus.ERROR}
				logIn={loginFn()}
			/>
		);
		expect(loginModule.find(RegistrationForm).length).toBe(1);
		expect(loginModule.find(LoadingScreen).length).toBe(0);
	});
	it("render RegistrationForm while ERROR IDLE", () => {
		const loginModule = mount(
			<LoginModule
				username=""
				status={EUserStatus.IDLE}
				logIn={loginFn()}
			/>
		);
		expect(loginModule.find(RegistrationForm).length).toBe(1);
		expect(loginModule.find(LoadingScreen).length).toBe(0);
	});

	it("fire login on click", () => {
		const loginModule = mount(
			<LoginModule
				username=""
				status={EUserStatus.FULFILL}
				logIn={loginFn()}
			/>
		);
		const registrationForm = loginModule.find(RegistrationForm);

		registrationForm.props().onLogIn("Alex");

		expect(loginFn).toBeCalled();
	});
});
