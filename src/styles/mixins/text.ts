import { css } from "@emotion/core";

export const MixinFuncTextEllipse = ({
	width,
	maxWidth,
}: {
	width?: number;
	maxWidth?: number;
}) => {
	return css`
		overflow: hidden;
		${width && `width: ${width}px;`}
		${maxWidth && `max-width: ${maxWidth}px;`}
		white-space: nowrap;
		text-overflow: ellipsis;
	`;
};
