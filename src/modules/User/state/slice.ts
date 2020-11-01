import { createSlice } from "@reduxjs/toolkit";
import { EUserStatus } from "./";

export interface IUser {
	data: IUserData;
	status: EUserStatus;
}

export interface IUserData {
	name: string;
}

export const initialState: IUser = {
	data: {
		name: "",
	},
	status: EUserStatus.IDLE,
};

export const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		add: (state, action: { payload: IUserData }) => {
			return {
				data: {
					name: action.payload.name,
				},
				status: EUserStatus.FULFILL,
			};
		},
		remove: () => ({
			...initialState,
			status: EUserStatus.FULFILL,
		}),
		pending: (state) => {
			state.status = EUserStatus.PENDING;
		},
		error: (state) => {
			state.status = EUserStatus.ERROR;
		},
	},
});
//
// export const getUserReducer = () => ({
// 	user: userSlice.reducer,
// })
//
// export type UserReducerType = ReturnType<typeof getUserReducer>;
//
