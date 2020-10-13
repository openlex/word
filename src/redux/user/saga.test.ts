import { expectSaga } from "redux-saga-test-plan";
import * as matchers from "redux-saga-test-plan/matchers";
import {
	EUserStatus,
	actions as userActions,
	reducer as userReducer,
	checkUserSession,
	removeUserSession,
	saveUserSession,
} from "@rdx";
import { AuthApi } from "@api";

describe("Login saga", () => {
	const userName = "Name";
	const user = { name: userName };

	it("checkUserSession success", () => {
		return expectSaga(checkUserSession)
			.withReducer(userReducer)
			.provide([[matchers.call.fn(AuthApi.fetchUser), user]])
			.put(userActions.pending())
			.put(userActions.add(user))
			.hasFinalState({
				data: {
					name: userName,
				},
				status: EUserStatus.FULFILL,
			})
			.run();
	});

	it("checkUserSession fail", () => {
		return expectSaga(checkUserSession)
			.withReducer(userReducer)
			.provide([matchers.call.fn(AuthApi.logOut)])
			.put(userActions.pending())
			.put(userActions.remove())
			.hasFinalState({
				data: {
					name: "",
				},
				status: EUserStatus.FULFILL,
			})
			.run();
	});

	it("signIn", () => {
		return expectSaga(saveUserSession, userActions.add(user))
			.call(AuthApi.signIn, userName)
			.run();
	});

	it("logOut", () => {
		return expectSaga(removeUserSession).call(AuthApi.logOut).run();
	});
});
