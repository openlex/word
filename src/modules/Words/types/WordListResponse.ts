// export interface IWordListResponse<P extends IWordListResponseItem, K extends keyof IWordListResponseItem> {
//     [K]: P;
// }

export type WordListResponse = IWordListResponseItem[];

export interface IWordListResponseItem {
	item: string;
	weight: number;
	pos: posType;
}

export type posType = "adverb" | "adjective" | "verb";
