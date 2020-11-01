import { AnyAction } from "redux";
import { call, fork, put, takeEvery } from "redux-saga/effects";
import { IUserResp, AuthApi } from "@/api/Auth";
import { userSlice } from "./";

export function* saveUserSession(action: AnyAction) {
	yield call(AuthApi.signIn, action.payload.name);
}

export function* removeUserSession() {
	yield call(AuthApi.logOut);
}

export function* checkUserSession() {
	const user: IUserResp = yield call(AuthApi.fetchUser);

	if (user?.name?.length) {
		yield put(userSlice.actions.pending());
		yield put(userSlice.actions.add({ name: user.name }));
	} else {
		yield put(userSlice.actions.pending());
		yield put(userSlice.actions.remove());
	}
}

export function* userSaga() {
	yield fork(checkUserSession);
	yield takeEvery(userSlice.actions.add.type, saveUserSession);
	yield takeEvery(userSlice.actions.remove.type, removeUserSession);
}
