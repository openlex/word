import { css } from "@emotion/core";

export const mixinAbsoluteCenter = css`
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
`;

export const mixinFlexCenter = css`
	display: flex;
	align-items: center;
	justify-content: center;
`;
