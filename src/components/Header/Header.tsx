import React from "react";
import { MainTitle } from "@components";
/** @jsx jsx */
import { jsx } from "@emotion/core";
import styled from "@emotion/styled";
import { colors } from "@styles";
import { UserPanel } from "@modules/User";

jsx;

const Wrapper = styled.div`
	background: ${colors.blue};
	padding: 10px;
	color: #fff;
	display: flex;
	justify-content: space-between;
`;

export const Header: React.FC = () => {
	return (
		<Wrapper>
			<MainTitle title="Вордариум2" />
			<UserPanel />
		</Wrapper>
	);
};
