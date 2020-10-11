import { expectSaga } from "redux-saga-test-plan";
import * as matchers from "redux-saga-test-plan/matchers";
import { checkUserSession, EUserStatus } from "@rdx";
import {
	actions,
	reducer as userReducer,
	removeUserSession,
	saveUserSession,
} from "@rdx/user";
import { AuthApi } from "@api";

describe("Login saga", () => {
	const userName = "Name";
	const user = { name: userName };

	it("checkUserSession success", () => {
		return expectSaga(checkUserSession)
			.withReducer(userReducer)
			.provide([[matchers.call.fn(AuthApi.fetchUser), user]])
			.put(actions.pending())
			.put(actions.add(user))
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
			.put(actions.pending())
			.put(actions.remove())
			.hasFinalState({
				data: {
					name: "",
				},
				status: EUserStatus.IDLE,
			})
			.run();
	});

	it("signIn", () => {
		return expectSaga(saveUserSession, actions.add(user))
			.call(AuthApi.signIn, userName)
			.run();
	});

	it("logOut", () => {
		return expectSaga(removeUserSession).call(AuthApi.logOut).run();
	});
});
