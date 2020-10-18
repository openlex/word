import { getDefaultMiddleware } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import { combineReducers } from "redux";
import { createStore } from "redux-dynamic-modules";
import { getUserModule, userSlice } from "@modules/User";
import { getSagaExtension } from "redux-dynamic-modules-saga";

const sagaMiddleware = createSagaMiddleware();
const middleware = [...getDefaultMiddleware(), sagaMiddleware];

if (process.env.NODE_ENV === `development`) {
	// eslint-disable-next-line @typescript-eslint/no-var-requires
	const { logger } = require(`redux-logger`);

	middleware.push(logger);
}

export const rootReducer = combineReducers({
	user: userSlice.reducer,
});

export type WordariumState = ReturnType<typeof rootReducer>;

export const store = createStore<WordariumState>(
	{ extensions: [getSagaExtension({})] },
	getUserModule()
);


export type RootReducerType = ReturnType<typeof rootReducer>;
