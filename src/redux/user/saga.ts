import { call, fork, put, takeEvery } from "redux-saga/effects";
import { AuthApi, IUserResp } from "@api";
import { AnyAction } from "redux";
import { actions as userActions } from "./slice";

export function* saveUserSession(action: AnyAction) {
	yield call(AuthApi.signIn, action.payload.name);
}

export function* removeUserSession() {
	yield call(AuthApi.logOut);
}

export function* checkUserSession() {
	const user: IUserResp = yield call(AuthApi.fetchUser);

	if (user?.name?.length) {
		yield put(userActions.pending());
		yield put(userActions.add({ name: user.name }));
	} else {
		yield put(userActions.pending());
		yield put(userActions.remove());
	}
}

export function* userSaga() {
	yield fork(checkUserSession);
	yield takeEvery(userActions.add.type, saveUserSession);
	yield takeEvery(userActions.remove.type, removeUserSession);
}
