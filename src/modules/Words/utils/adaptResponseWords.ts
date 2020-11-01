import { WordListResponse } from "@/modules";

export const adaptResponseWords = (resp: WordListResponse) =>
	resp.map((obj) => obj.item);
