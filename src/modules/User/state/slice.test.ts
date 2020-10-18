import { EUserStatus, initialState, userSlice } from "./";

describe("Login slice", () => {
	const userName = "Name";
	const user = { name: userName };
	const stateFullFill = {
		data: {
			name: userName,
		},
		status: EUserStatus.FULFILL,
	};
	const { actions, reducer } = userSlice;

	it("initial state", () => {
		expect(reducer(undefined, { type: "dummy_action" })).toEqual(
			initialState
		);
	});

	it("add user", () => {
		expect(reducer(undefined, actions.add(user))).toEqual(stateFullFill);
	});

	it("remove user", () => {
		expect(reducer(stateFullFill, actions.remove())).toEqual({
			...initialState,
			status: EUserStatus.FULFILL,
		});
	});

	it("pending user", () => {
		expect(reducer(stateFullFill, actions.pending())).toEqual({
			...stateFullFill,
			status: EUserStatus.PENDING,
		});
	});

	it("error", () => {
		expect(reducer(stateFullFill, actions.error())).toEqual({
			...stateFullFill,
			status: EUserStatus.ERROR,
		});
		expect(reducer(initialState, actions.error())).toEqual({
			...initialState,
			status: EUserStatus.ERROR,
		});
	});
});
