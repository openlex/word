import React from "react";
import styled from "@emotion/styled";
import { MixinFuncTextEllipse } from "@styles";

interface IUser {
	user: string;

	onClick(): void;
}

const Wrapper = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
`;
const UserName = styled.div`
	${MixinFuncTextEllipse({ maxWidth: 120 })}
	margin-right: 10px;
	font-size: 16px;
`;

export const User: React.FC<IUser> = ({ user, onClick }: IUser) => {
	return (
		<Wrapper>
			<UserName>{user}</UserName>
			<button data-test-id="button" onClick={onClick}>
				Выйти
			</button>
		</Wrapper>
	);
};
