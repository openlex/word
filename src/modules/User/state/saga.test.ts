import { expectSaga, testSaga } from "redux-saga-test-plan";
import * as matchers from "redux-saga-test-plan/matchers";
import { AuthApi } from "@api";
import {
	EUserStatus,
	checkUserSession,
	removeUserSession,
	saveUserSession,
	userSlice,
	userSaga,
} from "./";

describe("Login saga", () => {
	const userName = "Name";
	const user = { name: userName };
	const { actions, reducer } = userSlice;

	it("checkUserSession success testsaga", () => {
		testSaga(userSaga)
			.next()
			.fork(checkUserSession)
			.next()
			.takeEvery(userSlice.actions.add.type, saveUserSession)
			.next()
			.takeEvery(userSlice.actions.remove.type, removeUserSession);
	});

	it("checkUserSession success", () => {
		return expectSaga(checkUserSession)
			.withReducer(reducer)
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
			.withReducer(reducer)
			.provide([matchers.call.fn(AuthApi.logOut)])
			.put(actions.pending())
			.put(actions.remove())
			.hasFinalState({
				data: {
					name: "",
				},
				status: EUserStatus.FULFILL,
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
