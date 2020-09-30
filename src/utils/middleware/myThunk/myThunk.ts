import { AnyAction, Dispatch } from "redux";

type storeType = {
	dispatch: Dispatch;
	getState: () => {};
};

export const myThunk = ({ dispatch, getState }: storeType) => (
	next: Dispatch
) => (action: AnyAction | Function) => {
	if (typeof action === "function") {
		return action(dispatch, getState);
	}

	return next(action);
};
