import { sleep } from "@/utils";
import axios from "axios";
import { IPeopleResp } from "@api/Auth/types";

export class AuthApi {
	static signIn = async (name: string) => {
		await sleep(1000);
		localStorage.setItem("name", name);
	};

	static logOut = async () => {
		await sleep(1000);
		localStorage.removeItem("name");
	};

	static isLoggedIn = async (): Promise<boolean> => {
		await sleep(1000);
		return !!localStorage.getItem("name");
	};

	static fetchUser = async (): Promise<{ name: string | null }> => {
		const resp: IPeopleResp = await axios.get(
			"https://swapi.dev/api/people"
		);
		const userName = resp?.results[0]?.name;

		return { name: userName };
	};
}
