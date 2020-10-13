import {
	EUserStatus,
	initialState,
	actions as userActions,
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
		expect(userReducer(undefined, userActions.add(user))).toEqual(
			stateFullFill
		);
	});

	it("remove user", () => {
		expect(userReducer(stateFullFill, userActions.remove())).toEqual({
			...initialState,
			status: EUserStatus.FULFILL,
		});
	});

	it("pending user", () => {
		expect(userReducer(stateFullFill, userActions.pending())).toEqual({
			...stateFullFill,
			status: EUserStatus.PENDING,
		});
	});

	it("error", () => {
		expect(userReducer(stateFullFill, userActions.error())).toEqual({
			...stateFullFill,
			status: EUserStatus.ERROR,
		});
		expect(userReducer(initialState, userActions.error())).toEqual({
			...initialState,
			status: EUserStatus.ERROR,
		});
	});
});
