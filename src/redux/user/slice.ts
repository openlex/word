import { createSlice } from "@reduxjs/toolkit";
import { IUser, IUserData } from "@rdx/user/types";
import { EUserStatus } from "./EUserStatus";

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
		remove: () => {
			return initialState;
		},
		pending: (state) => {
			state.status = EUserStatus.PENDING;
		},
		error: (state) => {
			state.status = EUserStatus.ERROR;
		},
	},
});

export const { reducer, actions } = userSlice;
