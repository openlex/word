// import React from "react";
import React from "react";
import { FieldInput, IFieldInputData, IFieldInputProps } from "@components";
import { shallow, ShallowWrapper } from "enzyme";

describe("FieldInput item", () => {
	const defaultProps = {
		name: "Name",
		label: "Label",
		value: "Value",
	};
	const defaultFieldInput = shallow(<FieldInput {...defaultProps} />);

	it("check input Name", () => {
		expect(
			defaultFieldInput.find('[data-test-id="fieldInput"]').props().name
		).toEqual(defaultProps.name);
	});

	it("check textarea Name", () => {
		const props = {
			...defaultProps,
			isTextArea: true,
		};

		expect(
			defaultFieldInput.find('[data-test-id="fieldInput"]').props().name
		).toEqual(props.name);
	});

	it("Label exist if it set in props", () => {
		expect(
			defaultFieldInput.find('[data-test-id="fieldInputLabel"]').length
		).toBe(1);
	});

	it("NO Label if it is not set in props", () => {
		defaultFieldInput.setProps({
			label: undefined,
		});
		expect(
			defaultFieldInput.find('[data-test-id="fieldInputLabel"]').length
		).toBe(0);
	});

	it("input has value if it is set in props", () => {
		expect(
			defaultFieldInput.find('[data-test-id="fieldInput"]').props().value
		).toEqual(defaultProps.value);
	});

	it("check type", () => {
		const props = {
			...defaultProps,
			type: "number",
		};
		const fieldInput = shallow(<FieldInput {...props} />);

		expect(
			fieldInput.find('[data-test-id="fieldInput"]').props().type
		).toEqual(props.type);
	});

	it("check default type", () => {
		const props = {
			...defaultProps,
		};
		const defaultType = "text";
		const fieldInput = shallow(<FieldInput {...props} />);

		expect(
			fieldInput.find('[data-test-id="fieldInput"]').props().type
		).toEqual(defaultType);
	});

	it("match Snapshot", () => {
		expect(defaultFieldInput).toMatchSnapshot();
	});
});

describe("change value", () => {
	const defaultProps = {
		name: "Name",
		label: "Label",
		value: "Value",
	};
	let fieldInput: ShallowWrapper;

	beforeEach(() => {
		fieldInput = shallow(<FieldInput {...defaultProps} />);
	});

	const changeEvent = (props: IFieldInputProps, newValue: string) => {
		fieldInput.setProps(props);
		const node = fieldInput.find('[data-test-id="fieldInput"]');
		expect(node.prop("value")).toEqual(props.value);
		node.simulate("change", { target: { value: newValue } });
		fieldInput.update();
	};

	it("onChange input text", () => {
		const newValue = "Any text";
		const props = {
			...defaultProps,
			onChange: ({ value }: IFieldInputData) => {
				props.value = value;
			},
		};

		changeEvent(props, newValue);
		expect(props.value).toEqual(newValue);
	});

	it("onChangeField input text", () => {
		const newValue = "Any text";
		const props = {
			...defaultProps,
			onChangeField: (name: string, value: string) => {
				props.value = value;
			},
		};
		changeEvent(props, newValue);
		expect(props.value).toEqual(newValue);
	});

	it("onChange textarea text", () => {
		const newValue = "Any text";
		const props = {
			...defaultProps,
			isTextArea: true,
			onChange: ({ value }: IFieldInputData) => {
				props.value = value;
			},
		};

		changeEvent(props, newValue);
		expect(props.value).toEqual(newValue);
	});
});
