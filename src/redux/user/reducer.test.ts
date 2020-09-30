import {
	userReducer,
	signIn,
	logOut,
	fetchCurrentUser,
	initialUser,
	addUser,
} from "@rdx";
import { EUserStatus } from "@rdx";

describe("test user reducers", () => {
	const name = "Alex";
	const anyUser = {
		name: "Killmore",
		status: EUserStatus.FULFILL,
	};
	const enterPayload = { name };

	it("initial state", () => {
		const action = { type: "dummy_action" };

		expect(userReducer(undefined, action)).toEqual(initialUser);
	});

	it("addUser", () => {
		expect(userReducer(initialUser, addUser(name)).name).toBe(name);
	});

	describe("signIn", () => {
		it("signIn user pending", () => {
			expect(
				userReducer(initialUser, { type: signIn.pending.type }).status
			).toEqual(EUserStatus.PENDING);
		});

		it("signIn reject", () => {
			expect(
				userReducer(initialUser, { type: signIn.rejected.type }).status
			).toEqual(EUserStatus.ERROR);
		});

		it("signIn user success", () => {
			expect(
				userReducer(initialUser, {
					type: signIn.fulfilled.type,
					payload: enterPayload,
				}).status
			).toEqual(EUserStatus.FULFILL);
		});
	});
	describe("logOut", () => {
		it("logOut user pending", () => {
			expect(
				userReducer(initialUser, { type: logOut.pending.type }).status
			).toEqual(EUserStatus.PENDING);
		});

		it("logOut reject", () => {
			expect(
				userReducer(anyUser, { type: logOut.rejected.type }).status
			).toEqual(EUserStatus.ERROR);
		});

		it("logOut success", () => {
			expect(
				userReducer(anyUser, {
					type: logOut.fulfilled.type,
					payload: enterPayload,
				})
			).toEqual(initialUser);
		});
	});
	describe("fetch", () => {
		it("fetch user reject", () => {
			expect(
				userReducer(initialUser, {
					type: fetchCurrentUser.rejected.type,
				}).status
			).toEqual(EUserStatus.ERROR);
		});

		it("fetch user pending", () => {
			expect(
				userReducer(initialUser, {
					type: fetchCurrentUser.pending.type,
				}).status
			).toEqual(EUserStatus.PENDING);
		});

		it("fetch user success", () => {
			expect(
				userReducer(initialUser, {
					type: fetchCurrentUser.fulfilled.type,
					payload: enterPayload,
				}).status
			).toEqual(EUserStatus.FULFILL);
		});
	});
});
