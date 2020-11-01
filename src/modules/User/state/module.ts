import { ISagaModule } from "redux-dynamic-modules-saga";
import { userSlice, userSaga } from "./";

export const getUserModule = (): ISagaModule<typeof userSlice.reducer> => ({
	id: "user",
	reducerMap: {
		user: userSlice.reducer,
	},
	sagas: [userSaga],
});
