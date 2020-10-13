import React from "react";
import { MainTitle, User } from "@components";
/** @jsx jsx */
import { jsx } from "@emotion/core";
import styled from "@emotion/styled";
import { colors } from "@styles";

jsx;

export interface IHeader {
	username: string;
	onLogOut(): void;
}

const Wrapper = styled.div`
	background: ${colors.blue};
	padding: 10px;
	color: #fff;
	display: flex;
	justify-content: space-between;
`;

export const Header: React.FC<IHeader> = ({ username, onLogOut }) => {
	return (
		<Wrapper>
			<MainTitle title="Вордариум2" />
			{username && (
				<User data-test-id="user" user={username} onClick={onLogOut} />
			)}
		</Wrapper>
	);
};
