import React from "react";
import { shallow } from "enzyme";
import { Title } from "@components";

describe("Title markup", () => {
	it("match snapshoot", () => {
		expect(shallow(<Title level={1}>Title</Title>)).toMatchSnapshot();
		expect(shallow(<Title level={2}>Title</Title>)).toMatchSnapshot();
		expect(shallow(<Title level={3}>Title</Title>)).toMatchSnapshot();
		expect(shallow(<Title level={4}>Title</Title>)).toMatchSnapshot();
	});
});
