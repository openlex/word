import React from "react";
import styled from "@emotion/styled";

export interface IMainTitleProps {
	title: string;
}

const Title = styled.span`
	font-size: 20px;
	font-weight: bold;
	margin: 0;
`;

export const MainTitle: React.FC<IMainTitleProps> = (
	props: IMainTitleProps
) => {
	const { title } = props;

	if (!title) {
		return null;
	}

	return <Title data-test-id="value">{title}</Title>;
};
