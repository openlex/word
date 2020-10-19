import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import { combineReducers } from "redux";
import { reducer as userReducer } from "@rdx/user";
import { fork } from "redux-saga/effects";
import { userSlice } from "./user/slice";
import { userSaga } from "./user/saga";

function* rootSaga() {
	yield fork(userSaga);
}

const sagaMiddleware = createSagaMiddleware();
const middleware = [...getDefaultMiddleware(), sagaMiddleware];

if (process.env.NODE_ENV === `development`) {
	// eslint-disable-next-line @typescript-eslint/no-var-requires
	const { logger } = require(`redux-logger`);

	middleware.push(logger);
}

export const rootReducer = combineReducers({
	userReducer: userSlice.reducer,
});

export const store = configureStore({
	reducer: rootReducer,
	middleware,
});

sagaMiddleware.run(rootSaga);

export type RootReducerType = ReturnType<typeof rootReducer>;
