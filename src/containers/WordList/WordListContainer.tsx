import * as React from "react";
import { WordList } from "@components";
import { IWord, IWordListResponseItem } from "@types";

export interface IWordListContainerProps {
	users?: string;
}

export interface IWordListContainerState {
	wordList: IWord[];
	isSendEnabled: boolean;
}

export class WordListContainer extends React.Component<
	IWordListContainerProps,
	IWordListContainerState
> {
	constructor(props: IWordListContainerProps) {
		super(props);

		this.state = {
			wordList: [],
			isSendEnabled: false,
		};

		this.onWordClick = this.onWordClick.bind(this);
	}

	async componentDidMount() {
		try {
			const wordListResponse = await this.fetchWordList();

			this.setState({
				wordList: [
					...this.state.wordList,
					...this.getAdaptWordList(wordListResponse),
				],
			});
		} catch (err) {
			throw new Error(`I crashed!: ${err}`);
		}

		window.addEventListener("scroll", this.onScroll);
	}

	componentDidUpdate(
		prevProps: IWordListContainerProps,
		prevState: IWordListContainerState
	) {
		const { wordList } = this.state;
		const { isSendEnabled: prevIsSendEnabled } = prevState;
		const couldSendAnswer =
			wordList.filter((wordItem) => wordItem.isActive).length >= 2;

		if (couldSendAnswer && !prevIsSendEnabled) {
			this.setState({
				isSendEnabled: true,
			});
		} else if (!couldSendAnswer && prevIsSendEnabled) {
			this.setState({
				isSendEnabled: false,
			});
		}
	}

	componentWillUnmount() {
		window.removeEventListener("scroll", this.onScroll);
	}

	async fetchWordList(): Promise<IWordListResponseItem[]> {
		const response = await fetch(
			"https://my-json-server.typicode.com/openlex/wordarium/words"
		);

		return await response.json();
	}

	onWordClick(id: string) {
		const wordList = this.state.wordList.map((item) => {
			if (item.id === id) {
				item.isActive = !item.isActive;
			}

			return item;
		});

		this.setState({
			wordList: wordList,
		});
	}

	getAdaptWordList(wordListResponse: IWordListResponseItem[]): IWord[] {
		return wordListResponse.map((wordItem) => {
			return {
				id: wordItem.item,
				value: wordItem.item,
				isDifficult: wordItem.weight < 30,
			};
		});
	}

	onScroll() {
		document.title = window.scrollY.toString();
	}

	render() {
		const { wordList, isSendEnabled } = this.state;

		return (
			<>
				<WordList wordList={wordList} onClick={this.onWordClick} />
				<button data-test-id="submitBtn" disabled={!isSendEnabled}>
					Отправить ответ
				</button>
			</>
		);
	}
}
