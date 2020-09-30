import React from "react";
import { EProgress, PlayerAvatar } from "@components";
import { mount, ReactWrapper } from "enzyme";

describe("test action buttons", () => {
	let playerAvatar: ReactWrapper;
	const avatarProps = {
		size: 100,
		pic: "https://url",
		color: "red",
		time: 60,
	};
	const useState = jest.fn();
	const useStateSpy = jest.spyOn(React, "useState");
	/* eslint-disable @typescript-eslint/ban-ts-ignore */
	// @ts-ignore
	useStateSpy.mockImplementation((state: boolean) => [state, useState]);

	beforeEach(() => {
		playerAvatar = mount(<PlayerAvatar {...avatarProps} />);
	});

	it("click play", () => {
		playerAvatar.setProps({
			isInitialPlay: false,
		});

		const playBtn = playerAvatar.find('[data-test-id="play-btn"]');
		playBtn.simulate("click");
		expect(useState).toHaveBeenCalledWith(EProgress.PLAY);
	});

	it("click pause", () => {
		playerAvatar.find('[data-test-id="pause-btn"]').simulate("click");
		expect(useState).toHaveBeenCalledWith(EProgress.PAUSED);
	});

	it("click stop", async () => {
		jest.useFakeTimers();
		playerAvatar.find('[data-test-id="stop-btn"]').simulate("click");
		expect(useState).toHaveBeenCalledWith(EProgress.STOP);
	});

	it("click finish", () => {
		playerAvatar.find('[data-test-id="finish-btn"]').simulate("click");
		expect(useState).toHaveBeenCalledWith(EProgress.FINISH);
	});
});

describe("test markup", () => {
	let playerAvatar: ReactWrapper;
	const avatarProps = {
		size: 100,
		pic: "https://url",
		color: "red",
		time: 60,
	};

	beforeEach(() => {
		playerAvatar = mount(<PlayerAvatar {...avatarProps} />);
	});

	it("check timer", () => {
		expect(
			Number(playerAvatar.find('[data-test-id="timer"]').at(1).text())
		).toBe(avatarProps.time);
	});

	it("match Snapshot", () => {
		expect(playerAvatar).toMatchInlineSnapshot(`ReactWrapper {}`);
	});
});
