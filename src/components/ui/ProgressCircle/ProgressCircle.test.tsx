import React from "react";
import { ProgressCircle } from "@components";
import { shallow, ShallowWrapper } from "enzyme";

describe("Progress circle", () => {
	let progressCircle: ShallowWrapper = {} as ShallowWrapper;
	const size = 100;
	const strokeWidth = 10;
	const radius = size / 2 - strokeWidth / 2;

	it("check svg size", () => {
		progressCircle = shallow(<ProgressCircle size={size} />);

		expect(
			progressCircle.find('[data-test-id="svg"]').props().width
		).toEqual(size);
		expect(
			progressCircle.find('[data-test-id="svg"]').props().height
		).toEqual(size);
	});

	it("check circles center and radius", () => {
		progressCircle = shallow(
			<ProgressCircle size={size} strokeWidth={strokeWidth} />
		);

		expect(
			progressCircle.find('[data-test-id="circle-1"]').props().cx
		).toEqual(size / 2);
		expect(
			progressCircle.find('[data-test-id="circle-1"]').props().cy
		).toEqual(size / 2);
		expect(
			progressCircle.find('[data-test-id="circle-1"]').props().r
		).toEqual(radius);

		expect(
			progressCircle.find('[data-test-id="circle-2"]').props().cx
		).toEqual(size / 2);
		expect(
			progressCircle.find('[data-test-id="circle-2"]').props().cy
		).toEqual(size / 2);
		expect(
			progressCircle.find('[data-test-id="circle-2"]').props().r
		).toEqual(radius);
	});

	it("has child", () => {
		const child = "text";
		const progressCircle = shallow(
			<ProgressCircle size={size}>{child}</ProgressCircle>
		);
		expect(progressCircle.find('[data-test-id="content"]').length).toBe(1);
		expect(progressCircle.find('[data-test-id="content"]').text()).toBe(
			child
		);
	});

	it("match Snapshot", () => {
		expect(progressCircle).toMatchInlineSnapshot(`ShallowWrapper {}`);
	});
});
