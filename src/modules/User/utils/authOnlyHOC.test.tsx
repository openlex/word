import React from "react";
import { mount, ReactWrapper } from "enzyme";
import { Provider } from "react-redux";
import { userSlice, EUserStatus, authOnlyHOC } from "@/modules/User";
import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "@/store";

const { actions } = userSlice;

jest.mock("react-router-dom", () => ({
	Redirect: function Redirect(props: any) {
		return <div>Redirect: {JSON.stringify(props)}</div>;
	},
}));

describe("authorizedOnlyHoc", () => {
	const Component: React.FC = () => <h1>done</h1>;
	let wrapper: ReactWrapper;
	const store = configureStore({
		reducer: rootReducer,
	});

	beforeEach(() => {
		const AuthComp = authOnlyHOC(() => <Component />);
		wrapper = mount(
			<Provider store={store}>
				<AuthComp />
			</Provider>
		);
	});

	it("Render component if user is added in store", async () => {
		const payload = { name: "Alex" };
		store.dispatch(actions.add(payload));
		wrapper.update();
		expect(store.getState().user.status).toBe(EUserStatus.FULFILL);
		expect(wrapper.html()).toMatchInlineSnapshot(`"<h1>done</h1>"`);
	});

	it("Render LoadingScreen preloader if store status is pending", async () => {
		store.dispatch(actions.pending());
		wrapper.update();
		expect(store.getState().user.status).toBe(EUserStatus.PENDING);
		expect(wrapper.find('[data-test-id="loading-screen"]').length).toBe(1);
	});

	it("Redirect on redirectPath if no user", async () => {
		store.dispatch(actions.remove());
		wrapper.update();
		expect(wrapper.html()).toMatchInlineSnapshot(
			`"<div>Redirect: {\\"to\\":\\"/signIn\\"}</div>"`
		);
	});
	it("Redirect on redirectPath if error in auth", async () => {
		store.dispatch(actions.error());
		wrapper.update();
		expect(wrapper.html()).toMatchInlineSnapshot(
			`"<div>Redirect: {\\"to\\":\\"/signIn\\"}</div>"`
		);
	});
});
