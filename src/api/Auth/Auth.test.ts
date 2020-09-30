import axios from "axios";

import { AuthApi } from "./Auth";

jest.mock("axios");

describe("fetchData", () => {
	it("fetches successfully data from an API", async () => {
		const data = {
			count: 82,
			next: "http://swapi.dev/api/people/?page=2",
			previous: null,
			results: [
				{
					name: "Luke Skywalker",
					height: "172",
					mass: "77",
				},
			],
		};

		axios.get.mockImplementationOnce(() => Promise.resolve(data));

		await expect(AuthApi.fetchUser()).resolves.toEqual({
			name: data.results[0].name,
		});
	});

	it("fetches erroneously data from an API", async () => {
		const errorMessage = "Network Error";

		axios.get.mockImplementationOnce(() =>
			Promise.reject(new Error(errorMessage))
		);

		await expect(AuthApi.fetchUser()).rejects.toThrow(errorMessage);
	});
});
