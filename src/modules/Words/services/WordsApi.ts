import { adaptResponseWords, WordListResponse } from "@/modules";
import axios from "axios";

export class WordsApi {
	static async fetch() {
		const response = await axios.get(
			"https://my-json-server.typicode.com/openlex/wordarium/words"
		);
		const list = response.data.json() as WordListResponse;

		return await adaptResponseWords(list);
	}
}
