import React, { useCallback, useEffect, useRef, useState } from "react";
import styled from "@emotion/styled";
import { EProgress, ProgressCircle } from "@components";
import { colors, mixinAbsoluteCenter } from "@styles";
/** @jsx jsx */
import { css, jsx } from "@emotion/core";

jsx;

export interface IPlayerAvatarProps {
	size: number;
	pic?: string;
	color?: string;
	time?: number;
	className?: string;

	isInitialPlay?: boolean;
}

export const PlayerAvatar: React.FC<IPlayerAvatarProps> = (
	props: IPlayerAvatarProps
) => {
	const {
		color,
		time = 10,
		pic,
		isInitialPlay = true,
		...progressCircleProps
	} = props;
	const [progress, setProgress] = useState(0);
	const [progressType, setProgressType] = useState<EProgress>(
		isInitialPlay ? EProgress.PLAY : EProgress.STOP
	);
	const timerRef = useRef<NodeJS.Timeout | undefined>();
	const Pic = styled.div`
		background-image: ${pic ? `url(${pic})` : null};
		border-radius: 50%;
		width: 100%;
		height: 100%;
		background-position: center;
		background-size: cover;
	`;
	const Timer = styled.div`
		${mixinAbsoluteCenter}
		font-size: 28px;
		font-weight: bold;
		text-align: center;
		color: #fff;
		text-shadow: 0px 0px 8px black;
		font-family: Helvetica;
	`;
	const TICK = 1000;

	const reset = useCallback(() => {
		setProgress(0);
	}, []);

	const onPlay = useCallback(() => {
		setProgressType(EProgress.PLAY);
	}, []);

	const onPause = useCallback(() => {
		setProgressType(EProgress.PAUSED);
	}, []);

	const onStop = useCallback(() => {
		reset();
		setProgressType(EProgress.STOP);
	}, [reset]);

	const onFinish = useCallback(() => {
		setProgressType(EProgress.FINISH);
		setProgress(time);

		if (timerRef.current) {
			clearInterval(timerRef.current);
		}
	}, [time]);

	const pause = useCallback(() => {
		timerRef.current && clearInterval(timerRef.current);
	}, []);

	const play = useCallback(() => {
		timerRef.current = setInterval(() => {
			const currentProgress = progress + TICK / 1000;

			setProgress(currentProgress < time ? currentProgress : time);
		}, TICK);
	}, [progress, time]);

	useEffect(() => {
		if (progressType === EProgress.PLAY) {
			if (progress === time) {
				pause();
			}
			play();
		}
		if (progress === time) {
			onFinish();
		}

		return () => {
			if (timerRef && timerRef.current) {
				pause();
			}
		};
	}, [progressType, progress, play, pause, onFinish, time, timerRef]);

	return (
		<div
			data-test-id="container"
			css={css`
				position: relative;
			`}
		>
			<ProgressCircle
				data-test-id="circle"
				strokeColor={color}
				backStrokeColor={colors.gray}
				progress={progressType}
				{...progressCircleProps}
				time={time}
			>
				<Pic data-test-id="pic" />
				<Timer data-test-id="timer">
					{time - Math.floor(progress)}
				</Timer>
			</ProgressCircle>
			<div>
				<button
					data-test-id="play-btn"
					onClick={onPlay}
					disabled={
						progressType === EProgress.FINISH ||
						progressType === EProgress.PLAY
					}
				>
					play
				</button>
				<button
					data-test-id="pause-btn"
					onClick={onPause}
					disabled={
						progressType === EProgress.FINISH ||
						progressType === EProgress.PAUSED
					}
				>
					pause
				</button>
				<button
					data-test-id="stop-btn"
					onClick={onStop}
					disabled={progressType === EProgress.STOP}
				>
					stop
				</button>
				<button
					data-test-id="finish-btn"
					onClick={onFinish}
					disabled={progressType === EProgress.FINISH}
				>
					finish
				</button>
			</div>
		</div>
	);
};
