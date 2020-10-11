import { EUserStatus } from "@rdx/user/EUserStatus";

export interface IUser {
	data: IUserData;
	status: EUserStatus;
}

export interface IUserData {
	name: string;
}
