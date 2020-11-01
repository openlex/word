import React from "react";
import { LoadingScreen, ProgressCircle } from "@/components";
import { shallow, ShallowWrapper } from "enzyme";

describe("loading screen", () => {
	let loadingScreen: ShallowWrapper = {} as ShallowWrapper;

	beforeEach(() => {
		loadingScreen = shallow(<LoadingScreen />);
	});

	it("has progress circle", () => {
		expect(loadingScreen.find(ProgressCircle).length).toBe(1);
	});
});
