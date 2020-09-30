import { configureStore } from "@reduxjs/toolkit";
import thunkMiddleware from "redux-thunk";
import { fetchCurrentUser, logOut, signIn, userReducer } from "@rdx";
import { AuthApi } from "@api/Auth/Auth";

jest.mock("@api/Auth/Auth");

const USER_NAME = "Alex";
const middleware = [thunkMiddleware];

describe("test user actions", () => {
	let store: any;
	AuthApi.fetchUser = jest.fn().mockResolvedValue({
		name: USER_NAME,
	});
	const signInFn = jest.spyOn(AuthApi, "signIn");
	const logOutFn = jest.spyOn(AuthApi, "logOut");
	const fetchUserFn = jest.spyOn(AuthApi, "fetchUser");

	beforeEach(() => {
		store = configureStore({
			reducer: {
				userReducer,
			},
			middleware,
		});
		jest.spyOn(store, "dispatch");
	});

	it("addUser", async () => {
		await store.dispatch(signIn(USER_NAME));

		expect(signInFn).toBeCalled();
		expect(store.getState().userReducer.name).toBe(USER_NAME);
	});

	it("removeUser", async () => {
		const store = configureStore({
			reducer: {
				userReducer,
			},
			preloadedState: {
				userReducer: {
					name: USER_NAME,
				},
			},
		});

		await store.dispatch(logOut());

		expect(logOutFn).toBeCalled();
		expect(store.getState().userReducer.name).toBe("");
	});

	it("fetch user", async () => {
		await store.dispatch(fetchCurrentUser());

		expect(fetchUserFn).toBeCalled();
		expect(store.getState().userReducer.name).toBe(USER_NAME);
	});
});
