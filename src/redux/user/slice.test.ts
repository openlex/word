import {
	actions,
	EUserStatus,
	initialState,
	reducer as userReducer,
} from "@rdx/user";

describe("Login slice", () => {
	const userName = "Name";
	const user = { name: userName };
	const stateFullFill = {
		data: {
			name: userName,
		},
		status: EUserStatus.FULFILL,
	};

	it("initial state", () => {
		expect(userReducer(undefined, { type: "dummy_action" })).toEqual(
			initialState
		);
	});

	it("add user", () => {
		expect(userReducer(undefined, actions.add(user))).toEqual(
			stateFullFill
		);
	});

	it("remove user", () => {
		expect(userReducer(stateFullFill, actions.remove())).toEqual(
			initialState
		);
	});

	it("pending user", () => {
		expect(userReducer(stateFullFill, actions.pending())).toEqual({
			...stateFullFill,
			status: EUserStatus.PENDING,
		});
	});

	it("error", () => {
		expect(userReducer(stateFullFill, actions.error())).toEqual({
			...stateFullFill,
			status: EUserStatus.ERROR,
		});
		expect(userReducer(initialState, actions.error())).toEqual({
			...initialState,
			status: EUserStatus.ERROR,
		});
	});
});
