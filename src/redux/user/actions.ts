import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import { AuthApi } from "@api";

export const addUser = createAction<string>("user/add");

export const signIn = createAsyncThunk(
	"user/signIn",
	async (name: string, { dispatch }) => {
		await AuthApi.signIn(name);
		return dispatch(addUser(name));
	}
);

export const logOut = createAsyncThunk("user/logOut", async () => {
	await AuthApi.logOut();
});

export const fetchCurrentUser = createAsyncThunk(
	"user/fetchCurrentUser",
	async (undefined, { dispatch }) => {
		const user = await AuthApi.fetchUser();
		if (user?.name) {
			return dispatch(addUser(user.name));
		}
	}
);
