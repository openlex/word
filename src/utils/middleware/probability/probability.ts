import { Dispatch } from "redux";

export const probabilityMiddleware = () => (next: Dispatch) => (action: {
	type: string;
	meta: { probability: number };
}) => {
	const { probability } = action?.meta || 0;
	if (probability >= Math.random()) {
		return next(action);
	}
};
