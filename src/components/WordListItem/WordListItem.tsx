import React from "react";
/** @jsx jsx */
import { css, jsx } from "@emotion/core";

jsx;

export type IWordListItemProps = {
	value: string;
	isDifficult?: boolean;
	isActive?: boolean;
	onClick?(): void;
};

export class WordListItem extends React.PureComponent<IWordListItemProps> {
	render() {
		const { value, isDifficult, isActive, onClick } = this.props;
		const activeWord = css`
			${isActive ? "text-decoration: underline;" : ""}
		`;

		if (!value) {
			return null;
		}

		return (
			<li data-test-id={"item"} onClick={onClick}>
				<span
					css={activeWord}
					data-test-id="value"
					data-is-active={isActive ? "true" : "false"}
				>
					{value}
				</span>
				{isDifficult && <span data-test-id="isDifficult">*</span>}
			</li>
		);
	}
}
