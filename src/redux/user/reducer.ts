import { createReducer, PayloadAction } from "@reduxjs/toolkit";
import { addUser, fetchCurrentUser, logOut, signIn } from "./actions";
import { IUser } from "./types";
import { EUserStatus } from "@rdx/user/EUserStatus";

export const initialUser: IUser = {
	name: "",
	status: EUserStatus.IDLE,
};

type UserPayloadActionType = PayloadAction<{ name: string }>;

const isPendingActions = (action: {
	type: string;
}): action is UserPayloadActionType => {
	return /^(user\/).*(\/pending)$/.test(action.type);
};
const isRejectActions = (action: {
	type: string;
}): action is UserPayloadActionType => {
	return /^(user\/).*(\/rejected)$/.test(action.type);
};

export const userReducer = createReducer<IUser>(
	initialUser,
	{
		[logOut.fulfilled.type]: () => initialUser,
		[addUser.type]: (state, action) => {
			state.name = action.payload;
		},
		[signIn.fulfilled.type]: (state) => {
			state.status = EUserStatus.FULFILL;
		},
		[fetchCurrentUser.fulfilled.type]: (state) => {
			state.status = EUserStatus.FULFILL;
		},
	},
	[
		{
			matcher: isPendingActions,
			reducer: (state) => {
				state.status = EUserStatus.PENDING;
			},
		},
		{
			matcher: isRejectActions,
			reducer: (state) => {
				state.status = EUserStatus.ERROR;
			},
		},
	]
);
