import React from "react";
import styled from "@emotion/styled";

export interface ITitleProps {
	level: number;
	className?: string;
	children: React.ReactNode;
}

export const Title: React.FC<ITitleProps> = ({
	className,
	level,
	children,
}: ITitleProps) => {
	const Title1 = styled.h1`
		font-size: 22px;
		color: blue;
		font-weight: bold;
	`;
	const Title2 = styled.h2`
		font-size: 18px;
		font-weight: normal;
	`;
	const Title3 = styled.h3`
		font-size: 16px;
		font-weight: normal;
	`;
	const Title4 = styled.h4`
		font-size: 14px;
	`;

	switch (level) {
		case 1:
		default:
			return <Title1 className={className}>{children}</Title1>;
		case 2:
			return <Title2 className={className}>{children}</Title2>;
		case 3:
			return <Title3 className={className}>{children}</Title3>;
		case 4:
			return <Title4 className={className}>{children}</Title4>;
	}
};
