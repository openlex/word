import { configureStore } from "@reduxjs/toolkit";
import thunkMiddleware from "redux-thunk";
import { userReducer } from "./user";

const middleware = [thunkMiddleware];

export const store = configureStore({
	reducer: {
		userReducer,
	},
	middleware,
});
