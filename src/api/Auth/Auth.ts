import { sleep } from "@/utils";

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
}
