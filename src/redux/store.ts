import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import { combineReducers } from "redux";
import { reducer as userReducer, userSaga } from "@rdx";
import { fork } from "redux-saga/effects";

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
	userReducer,
});

export const store = configureStore({
	reducer: rootReducer,
	middleware,
});

sagaMiddleware.run(rootSaga);

export type RootReducerType = ReturnType<typeof rootReducer>;
