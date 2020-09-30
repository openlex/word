import React, { useRef } from "react";
/** @jsx jsx */
import { css, jsx, keyframes } from "@emotion/core";
import styled from "@emotion/styled";

jsx;

export enum EProgress {
	STOP = 0,
	PLAY = 1,
	PAUSED = 2,
	FINISH = 3,
}

export interface IProgressCircleProps {
	size: number;

	progress?: EProgress;
	strokeWidth?: number;
	strokeColor?: string;
	backStrokeColor?: string;
	children?: React.ReactNode;
	className?: string;
	time?: number;
}

export const ProgressCircle: React.FC<IProgressCircleProps> = (
	props: IProgressCircleProps
) => {
	const {
		className,
		size,
		strokeWidth = 5,
		strokeColor = "red",
		backStrokeColor = "pink",
		children,
		time = 60,
		progress,
	} = props;
	const center = size / 2;
	const radius = size / 2 - strokeWidth / 2;
	const circumference = 2 * Math.PI * radius;

	const circleRef = useRef(null);
	const contentSize = size - strokeWidth * 2;
	const animationKeyframe = keyframes`
        from { stroke-dashoffset: ${circumference}; }
        to { stroke-dashoffset: ${0}; }
    `;
	const Content = styled.div`
		width: ${contentSize}px;
		height: ${contentSize}px;
		position: absolute;
		top: ${strokeWidth}px;
		left: ${strokeWidth}px;
		border-radius: 50%;
		overflow: hidden;
		display: flex;
		align-item: center;
		justify-content: center;
		z-index: -1;
		text-align: center;
		align-items: center;
	`;
	let animationProp;
	let animationState = "running";
	const finishingSpeed = 1;

	switch (progress) {
		case EProgress.PAUSED:
			animationProp = css`
				${animationKeyframe} ${time}s forwards linear
			`;
			animationState = "paused";
			break;
		case EProgress.FINISH:
			animationProp = css`
				${animationKeyframe} ${finishingSpeed}s forwards linear
			`;
			break;
		case EProgress.STOP:
			animationProp = "none";
			break;
		case EProgress.PLAY:
		default:
			animationProp = css`
				${animationKeyframe} ${time}s forwards linear
			`;
			break;
	}

	return (
		<div
			css={css`
				position: relative;
			`}
			data-test-id="container"
		>
			<svg
				className={className}
				css={css`
					display: block;
					z-index: 1;
				`}
				width={size}
				height={size}
				data-test-id="svg"
			>
				<circle
					ref={circleRef}
					css={css`
						fill: none;
					`}
					stroke={backStrokeColor}
					cx={center}
					cy={center}
					r={radius}
					strokeWidth={strokeWidth}
					data-test-id="circle-1"
				/>
				<circle
					css={css`
						fill: none;
						transform: rotate(-90deg);
						transform-origin: center;
						animation: ${animationProp};
						animation-play-state: ${animationState};
					`}
					className="svg-circle"
					stroke={strokeColor}
					cx={center}
					cy={center}
					r={radius}
					strokeWidth={strokeWidth}
					strokeDasharray={circumference}
					strokeDashoffset={circumference}
					data-test-id="circle-2"
				/>
			</svg>
			{children && <Content data-test-id="content">{children}</Content>}
		</div>
	);
};
