import React from "react";
import { ProgressCircle } from "@components";
import styled from "@emotion/styled";
import { mixinFlexCenter } from "@styles";

const Wrapper = styled.div`
	${mixinFlexCenter}
	flex-direction: column;
	width: 100%;
	height: 80vh;
`;
const Text = styled.div`
	margin-bottom: 5px;
`;

export const LoadingScreen = () => {
	return (
		<Wrapper>
			<Text>Loading</Text>
			<ProgressCircle size={20} time={2} strokeWidth={2} />
		</Wrapper>
	);
};
