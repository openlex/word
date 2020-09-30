import React from "react";
import { mount } from "enzyme";
import { authOnlyHOC, sleep } from "@utils";
import { act } from "react-dom/test-utils";
import { AuthApi } from "@api/Auth/Auth";

jest.mock("react-router-dom", () => ({
	Redirect: function Redirect(props: any) {
		return <div>Redirect: {JSON.stringify(props)}</div>;
	},
}));

describe("authorizedOnlyHoc", () => {
	interface IComponentProps {
		name: string;
	}

	const Component: React.FC<IComponentProps> = ({ name }) => <h1>{name}</h1>;
	const WrappedComponent = authOnlyHOC(Component);

	it("renders placeholder during request and component on success", async () => {
		AuthApi.isLoggedIn = async () => true;

		const wrapper = mount(<WrappedComponent name="Bob" />);
		expect(wrapper.find('[data-test-id="loading-screen"]').length).toBe(1);
		await act(async () => {
			await sleep(1000);
			wrapper.update();
			expect(wrapper.html()).toMatchInlineSnapshot(`"<h1>Bob</h1>"`);
		});
	});

	it("renders placeholder during request and component on Error", async () => {
		AuthApi.isLoggedIn = async () => false;
		const wrapper = mount(<WrappedComponent name="Bob" />);

		expect(wrapper.find('[data-test-id="loading-screen"]').length).toBe(1);
		await act(async () => {
			await sleep(1000);
			wrapper.update();
			expect(wrapper.html()).toMatchInlineSnapshot(
				`"<div>Redirect: {\\"to\\":\\"/signIn\\"}</div>"`
			);
		});
	});
});
