export interface IPeopleResp {
	count?: number;
	next?: string;
	previous?: string;
	results: {
		name: string;
		[key: string]: string;
	}[];
}

export interface IUserResp {
	name: string;
}
