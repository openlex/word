import React from "react";
import { LoadingScreen } from "@components/LoadingScreen/LoadingScreen";
import { render } from "enzyme";

describe("loading screen", () => {
	it("markup", () => {
		expect(render(<LoadingScreen />)).toMatchSnapshot();
	});
});
