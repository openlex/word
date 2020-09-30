import { configureStore, createSlice } from "@reduxjs/toolkit";
import { probabilityMiddleware } from "@utils";

describe("test probability", () => {
	describe("test with store", () => {
		const initialState = { value: 0 };
		const slice = createSlice({
			name: "testProbability",
			initialState,
			reducers: {
				makeIt: {
					reducer: (state, action) => {
						state.value = action.payload;
					},
					prepare: ({ value, probability }) => ({
						payload: value,
						meta: { probability },
					}),
				},
			},
		});
		const { makeIt } = slice.actions;
		const store = configureStore({
			reducer: slice.reducer,
			middleware: (getDefaultMiddleware) =>
				getDefaultMiddleware().concat(probabilityMiddleware),
		});

		it("100%", () => {
			const value = 500;
			store.dispatch(makeIt({ value, probability: 1 }));
			expect(store.getState().value).toBe(value);
		});

		it("0%", () => {
			const value = 300;
			store.dispatch(makeIt({ value, probability: 0 }));
			expect(store.getState().value).not.toBe(value);
		});
	});

	describe("no store", () => {
		const next = jest.fn();
		const action = {
			type: "TEST",
			meta: {
				probability: 0,
			},
		};

		it("100%", () => {
			action.meta.probability = 1;
			probabilityMiddleware()(next)(action);

			expect(next).toBeCalledWith(action);
		});

		it("0%", () => {
			action.meta.probability = 0;
			probabilityMiddleware()(next)(action);

			expect(next).not.toBeCalled();
		});
	});
});
