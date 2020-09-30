import React, { useCallback } from "react";
import { MainTitle, User } from "@components";
import { useHistory } from "react-router-dom";
/** @jsx jsx */
import { jsx } from "@emotion/core";
import styled from "@emotion/styled";
import { colors } from "@styles";
import { ROUTES } from "@/ROUTES";

jsx;

interface IHeader {
	user: string;

	onLogOut(): void;
}

const Wrapper = styled.div`
	background: ${colors.blue};
	padding: 10px;
	color: #fff;
	display: flex;
	justify-content: space-between;
`;

export const Header: React.FC<IHeader> = ({ user, onLogOut }) => {
	const history = useHistory();
	const onLogOutClick = useCallback(async () => {
		onLogOut && (await onLogOut());
		history.push(ROUTES.auth);
	}, [history, onLogOut]);

	return (
		<Wrapper>
			<MainTitle title="Вордариум2" />
			{user && (
				<User data-test-id="user" user={user} onClick={onLogOutClick} />
			)}
		</Wrapper>
	);
};
